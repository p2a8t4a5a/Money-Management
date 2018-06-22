package com.money.management.auth.service;

import com.money.management.auth.repository.UserRepository;
import com.money.management.auth.domain.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@Service
public class UserServiceImpl implements UserService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private PasswordEncoder encoder;
    private UserRepository repository;

    @Autowired
    public UserServiceImpl(UserRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    @Override
    public void create(User user) {
        User existing = repository.findUsersByUsername(user.getUsername());
        Assert.isNull(existing, "User already exists: " + user.getUsername());

        String hash = encoder.encode(user.getPassword());
        user.setPassword(hash);

        repository.save(user);

        log.info("New user has been created: {}", user.getUsername());
    }
}
