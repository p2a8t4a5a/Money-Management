package com.money.management.auth.service.impl;

import com.money.management.auth.domain.ForgotPasswordToken;
import com.money.management.auth.domain.User;
import com.money.management.auth.listener.event.OnForgotPasswordCompleteEvent;
import com.money.management.auth.repository.ForgotPasswordTokenRepository;
import com.money.management.auth.repository.UserRepository;
import com.money.management.auth.service.ForgotPasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class ForgotPasswordServiceImpl implements ForgotPasswordService {

    private UserRepository userRepository;
    private ApplicationEventPublisher eventPublisher;
    private ForgotPasswordTokenRepository repository;

    @Autowired
    public ForgotPasswordServiceImpl(UserRepository userRepository,
                                     ApplicationEventPublisher eventPublisher,
                                     ForgotPasswordTokenRepository repository) {
        this.userRepository = userRepository;
        this.eventPublisher = eventPublisher;
        this.repository = repository;
    }

    @Override
    public String sendEmail(String email) {
        User user = userRepository.findUsersByUsername(email);
        String message = verifyUser(user);

        if (message != null) {
            return message;
        }

        eventPublisher.publishEvent(new OnForgotPasswordCompleteEvent(user));

        return null;
    }

    @Override
    public ForgotPasswordToken createToken(User user) {
        ForgotPasswordToken token = new ForgotPasswordToken();
        token.setUser(user);
        token.setToken(UUID.randomUUID().toString());
        token.setExpireDate(LocalDateTime.now().plusDays(1));

        repository.save(token);

        return token;
    }

    private String verifyUser(User user) {
        if (user == null) {
            return "User doesn't exist, please register !";
        }

        if (!user.isEnabled()) {
            return "The user isn't enabled !";
        }

        return null;
    }

}
