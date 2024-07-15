package com.ssafy.withme.api.service.user;


import com.ssafy.withme.domain.user.AuthProperties;
import com.ssafy.withme.domain.user.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JwtTokenService {


    // 토큰에 대한 정보
    private final AuthProperties authProperties;

    // 토큰 암호화 알고리즘
    private Key key;

    @PostConstruct
    private void init(){
        byte[] keyBytes = Decoders.BASE64.decode(authProperties.getSecretKey());
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String getUsername(String token){
        Claims claims = parseClaims(token);
        return claims.getSubject();
    }

    private Claims parseClaims(String token){

        try{
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        }catch(Exception e){
            throw new RuntimeException("token 발급 도중 오류가 발생했습니다.");
        }
    }


    public JwtToken generateToken(User user){
        Collection<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(user.getRoleType().name()));


        String authority = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = System.currentTimeMillis();
        Date accessTokenExpire = new Date(now + authProperties.getTokenExpiry());
        Date refreshTokenExpire = new Date(now + authProperties.getRefreshTokenExpiry());

        String accessToken = Jwts.builder()
                .setHeader(Map.of("typ", "JWT", "alg", "HS256"))
                .setSubject(user.getEmail())
                .claim("authorities", authority)
                .setIssuedAt(new Date(now))
                .setExpiration(accessTokenExpire)
                .signWith(key)
                .compact();

        String refreshToken = Jwts.builder()
                .setSubject(user.getEmail())
                .claim("authorities", authority)
                .setIssuedAt(new Date(now))
                .setExpiration(refreshTokenExpire)
                .signWith(key)
                .compact();

        return new JwtToken(accessToken, refreshToken);



    }

    // 토큰을 검증한다.
    public boolean validateToken(String accessToken) throws Exception{

        try{
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(accessToken)
                    .getBody();
            return claims != null;
        }catch(Exception e){
            throw new RuntimeException("토큰 파싱 중 오류가 발생했습니다.");
        }

    }


    public Authentication parseAuthentication(String accessToken) throws Exception{
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(accessToken)
                .getBody();


        // Claim에 저장된 권한을 추출한다.
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("authorities").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .toList();

        UserDetails principal = new org.springframework.security.core.userdetails.User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal,"", authorities);


    }

    public JwtToken generateTokenByRefreshToken(String refreshToken) {
        Claims claims = parseClaims(refreshToken);
        String email = claims.getSubject();

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("authorities").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .toList();

        String authority = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = System.currentTimeMillis();
        Date accessTokenExpire = new Date(now + authProperties.getTokenExpiry());
        Date refreshTokenExpire = new Date(now + authProperties.getRefreshTokenExpiry());

        String accessToken = Jwts.builder()
                .setHeader(Map.of("typ", "JWT", "alg", "HS256"))
                .setSubject(email)
                .claim("authorities", authority)
                .setIssuedAt(new Date(now))
                .setExpiration(accessTokenExpire)
                .signWith(key)
                .compact();

        String newRefreshToken = Jwts.builder()
                .setSubject(email)
                .claim("authorities", authority)
                .setIssuedAt(new Date(now))
                .setExpiration(refreshTokenExpire)
                .signWith(key)
                .compact();

        return new JwtToken(accessToken, newRefreshToken);
    }
}
