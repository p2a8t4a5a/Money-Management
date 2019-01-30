package com.money.management.auth.listener.event;

import com.money.management.auth.domain.VerificationToken;
import org.springframework.context.ApplicationEvent;

public class OnResendVerificationEmailCompleteEvent extends ApplicationEvent {
    private VerificationToken verificationToken;

    public OnResendVerificationEmailCompleteEvent(VerificationToken verificationToken) {
        super(verificationToken);
        this.verificationToken = verificationToken;
    }

    public VerificationToken getVerificationToken() {
        return verificationToken;
    }
}
