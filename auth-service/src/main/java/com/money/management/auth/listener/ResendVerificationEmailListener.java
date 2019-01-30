package com.money.management.auth.listener;

import com.money.management.auth.domain.EmailType;
import com.money.management.auth.domain.User;
import com.money.management.auth.domain.VerificationToken;
import com.money.management.auth.listener.event.OnResendVerificationEmailCompleteEvent;
import com.money.management.auth.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;

@Component
public class ResendVerificationEmailListener implements ApplicationListener<OnResendVerificationEmailCompleteEvent> {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private EmailService emailService;

    @Autowired
    public ResendVerificationEmailListener(EmailService emailService) {
        this.emailService = emailService;
    }

    @Override
    public void onApplicationEvent(OnResendVerificationEmailCompleteEvent event) {
        try {
            resendVerificationEmail(event);
        } catch (MessagingException e) {
            log.info(e.getMessage());
        }
    }

    private void resendVerificationEmail(OnResendVerificationEmailCompleteEvent event) throws MessagingException {
        VerificationToken verificationToken = event.getVerificationToken();
        User user = verificationToken.getUser();
        emailService.send(EmailType.VERIFICATION, user.getUsername(), verificationToken.getToken());

        log.info("Verification email has been resent to: {}", user.getUsername());
    }

}
