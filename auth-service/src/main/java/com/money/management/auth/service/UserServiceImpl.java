package com.money.management.auth.service;

import com.money.management.auth.repository.UserRepository;
import com.money.management.auth.domain.User;
import com.money.management.auth.service.security.OnRegistrationCompleteEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@Service
public class UserServiceImpl implements UserService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private PasswordEncoder encoder;
    private UserRepository repository;
    private ApplicationEventPublisher eventPublisher;

    @Autowired
    public UserServiceImpl(UserRepository repository, PasswordEncoder encoder, ApplicationEventPublisher eventPublisher) {
        this.repository = repository;
        this.encoder = encoder;
        this.eventPublisher = eventPublisher;
    }

    @Override
    public void create(User user) {
        User existing = repository.findUsersByUsername(user.getUsername());
        Assert.isNull(existing, "User already exists: " + user.getUsername());

        setUserValues(user);

        repository.save(user);
        log.info("New user has been created: {}", user.getUsername());

        sendVerificationEmail(user);
    }

    private void sendVerificationEmail(User user) {
        eventPublisher.publishEvent(new OnRegistrationCompleteEvent(user));
    }

    private void setUserValues(User user) {
        String hash = encoder.encode(user.getPassword());
        user.setPassword(hash);
        user.setEnabled(false);
    }

}
