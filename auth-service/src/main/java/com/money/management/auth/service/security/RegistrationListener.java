package com.money.management.auth.service.security;

import com.money.management.auth.domain.EmailType;
import com.money.management.auth.domain.User;
import com.money.management.auth.domain.VerificationToken;
import com.money.management.auth.service.EmailService;
import com.money.management.auth.service.VerificationTokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;

@Component
public class RegistrationListener implements ApplicationListener<OnRegistrationCompleteEvent> {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private VerificationTokenService verificationTokenService;
    private EmailService emailService;

    @Autowired
    public RegistrationListener(VerificationTokenService verificationTokenService, EmailService emailService) {
        this.verificationTokenService = verificationTokenService;
        this.emailService = emailService;
    }


    @Override
    public void onApplicationEvent(OnRegistrationCompleteEvent event) {
        try {
            this.confirmRegistration(event);
        } catch (MessagingException e) {
            log.info(e.getMessage());
        }
    }

    private void confirmRegistration(OnRegistrationCompleteEvent event) throws MessagingException {
        User user = event.getUser();
        VerificationToken verificationToken = verificationTokenService.create(user);
        emailService.send(EmailType.VERIFICATION, user.getUsername(), verificationToken.getToken());

        log.info("Verification email has been sent to: {}", user.getUsername());
    }

}
