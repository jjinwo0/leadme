package com.ssafy.withme.global.response;

import net.minidev.json.annotate.JsonIgnore;
import org.springframework.http.HttpStatus;

import java.util.List;

public class SuccessResponse<T> extends ApiResponse<T> {

    private final static SuccessResponse<Void> EMPTY = new SuccessResponse<>();

    public SuccessResponse() {

        super(true, HttpStatus.OK.value(), "Success Response");
    }

    public SuccessResponse(T data) {

        super(true, HttpStatus.OK.value(), "Success Response");
        super.data = data;
    }

    public static SuccessResponse<Void> empty() {

        return EMPTY;
    }

    public static <T> SuccessResponse<T> of(T data) {

        return new SuccessResponse<>(data);
    }
}
