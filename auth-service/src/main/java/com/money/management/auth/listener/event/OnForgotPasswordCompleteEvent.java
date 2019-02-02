package com.money.management.auth.listener.event;

import com.money.management.auth.domain.User;
import org.springframework.context.ApplicationEvent;

public class OnForgotPasswordCompleteEvent extends ApplicationEvent {

    private User user;

    public OnForgotPasswordCompleteEvent(User user) {
        super(user);
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}
