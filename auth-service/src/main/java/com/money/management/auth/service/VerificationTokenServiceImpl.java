package com.money.management.auth.service;

import com.money.management.auth.domain.User;
import com.money.management.auth.domain.VerificationToken;
import com.money.management.auth.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class VerificationTokenServiceImpl implements VerificationTokenService {

    private VerificationTokenRepository repository;

    @Autowired
    public VerificationTokenServiceImpl(VerificationTokenRepository repository) {
        this.repository = repository;
    }

    @Override
    public VerificationToken create(User user) {
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setExpireDate(LocalDateTime.now().plusDays(1));
        verificationToken.setToken(UUID.randomUUID().toString());
        verificationToken.setUser(user);

        repository.save(verificationToken);

        return verificationToken;
    }
}
