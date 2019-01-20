package com.money.management.auth.service;

import com.money.management.auth.domain.EmailType;

import javax.mail.MessagingException;

public interface EmailService {

    void send(EmailType type, String email, String token) throws MessagingException;

}
