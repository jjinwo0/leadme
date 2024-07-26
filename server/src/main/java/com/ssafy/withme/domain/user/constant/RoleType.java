package com.ssafy.withme.domain.user.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum RoleType {
    ADMIN("관리자", "ROLE_ADMIN"),
    USER("회원", "ROLE_USER");

    private final String description;
    private final String role;
}
