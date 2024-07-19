package com.ssafy.withme.domain.user.constant;

public enum TokenType {

    ACCESS, REFRESH;

    public static boolean isAccessToken(String tokenType){
        return TokenType.ACCESS.name().equals(tokenType);
    }
}
