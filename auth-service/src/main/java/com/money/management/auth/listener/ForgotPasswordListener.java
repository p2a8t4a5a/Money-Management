package com.money.management.auth.listener;

import com.money.management.auth.domain.EmailType;
import com.money.management.auth.domain.ForgotPasswordToken;
import com.money.management.auth.domain.User;
import com.money.management.auth.listener.event.OnForgotPasswordCompleteEvent;
import com.money.management.auth.service.EmailService;
import com.money.management.auth.service.ForgotPasswordService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;

@Component
public class ForgotPasswordListener implements ApplicationListener<OnForgotPasswordCompleteEvent> {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private EmailService emailService;
    private ForgotPasswordService forgotPasswordService;

    @Autowired
    public ForgotPasswordListener(EmailService emailService,
                                  ForgotPasswordService forgotPasswordService) {
        this.emailService = emailService;
        this.forgotPasswordService = forgotPasswordService;
    }


    @Override
    public void onApplicationEvent(OnForgotPasswordCompleteEvent event) {
        try {
            sendForgotPasswordEmail(event);
        } catch (MessagingException e) {
            log.info(e.getMessage());
        }
    }

    private void sendForgotPasswordEmail(OnForgotPasswordCompleteEvent event) throws MessagingException {
        User user = event.getUser();
        ForgotPasswordToken token = forgotPasswordService.createToken(user);
        emailService.send(EmailType.FORGOT_PASSWORD, user.getUsername(), token.getToken());

        log.info("Forgot Password email has been sent to: {}", user.getUsername());
    }

}
