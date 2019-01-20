package com.money.management.auth.service;

import com.money.management.auth.domain.User;
import com.money.management.auth.domain.VerificationToken;
import com.money.management.auth.repository.UserRepository;
import com.money.management.auth.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class VerificationTokenServiceImpl implements VerificationTokenService {

    private VerificationTokenRepository verificationTokenRepository;
    private UserRepository userRepository;

    @Autowired
    public VerificationTokenServiceImpl(VerificationTokenRepository verificationTokenRepository, UserRepository userRepository) {
        this.verificationTokenRepository = verificationTokenRepository;
        this.userRepository = userRepository;
    }

    @Override
    public VerificationToken create(User user) {
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setExpireDate(LocalDateTime.now().plusDays(1));
        verificationToken.setToken(UUID.randomUUID().toString());
        verificationToken.setUser(user);

        verificationTokenRepository.save(verificationToken);

        return verificationToken;
    }

    @Override
    public String enableUser(String token) {
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token);
        String message = verifyToken(verificationToken);

        if(message != null) {
            return message;
        }

        return enableUser(verificationToken.getUser());
    }

    private String verifyToken(VerificationToken verificationToken) {
        if(verificationToken == null) {
            return "Invalid Token !";
        }

        if(verificationToken.getExpireDate().isAfter(LocalDateTime.now())) {
            return "Verification toke has expired !";
        }

        return null;
    }

    private String enableUser(User user) {
        if(user.isEnabled()) {
            return "The user is already enabled !";
        }

        user.setEnabled(true);
        userRepository.save(user);

        return "The user was enabled, you can now login in the application !";
    }

}
