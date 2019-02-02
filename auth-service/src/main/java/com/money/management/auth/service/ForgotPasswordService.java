package com.money.management.auth.service;

import com.money.management.auth.domain.ForgotPasswordToken;
import com.money.management.auth.domain.User;

public interface ForgotPasswordService {
    String sendEmail(String email);

    ForgotPasswordToken createToken(User user);
}
