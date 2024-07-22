package com.ssafy.withme.domain.user.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum RoleType {
    ADMIN("ADMIN", "관리자"),
    USER("USER", "회원");

    private String type;
    private final String description;

    RoleType(String type, String description) {
        this.type = type;
        this.description = description;
    }

    public static boolean isRoleType(String type) {

        for (RoleType roleType : RoleType.values()) {
            if (roleType.type.equals(type)) {
                return true;
            }
        }

        return false;
    }
}
