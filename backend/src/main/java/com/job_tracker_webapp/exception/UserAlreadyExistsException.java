package com.job_tracker_webapp.exception;

public class UserAlreadyExistsException extends CustomException {
    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
