package com.ssafy.withme.global.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomErrors {

    private String field;

    private String message;

    private String code;

    private String objectName;
}
