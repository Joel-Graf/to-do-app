package com.joel.to_do_app.exceptions;

public class EntityValidationException extends RuntimeException {
    public EntityValidationException(String message) {
        super(message);
    }
}
