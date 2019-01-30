package com.money.management.auth.repository;

import com.money.management.auth.AuthApplication;
import com.money.management.auth.domain.User;
import com.money.management.auth.domain.VerificationToken;
import com.money.management.auth.util.UserUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.time.LocalDateTime;
import java.util.function.Function;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = AuthApplication.class)
public class VerificationTokenRepositoryTest {

    @Autowired
    private VerificationTokenRepository repository;

    @Test
    public void shouldSaveAndFindByToken() {
        compareVerificationTokens(verificationToken -> repository.findByToken(verificationToken.getToken()));
    }

    @Test
    public void shouldSaveAndFindByUsername() {
        compareVerificationTokens(verificationToken -> repository.findByUserUsername(verificationToken.getUser().getUsername()));
    }

    private void compareVerificationTokens(Function<VerificationToken, VerificationToken> function) {
        VerificationToken saved = createAndSaveVerificationToken();
        User savedUser = saved.getUser();

        VerificationToken found = function.apply(saved);
        User foundUser = found.getUser();

        assertVerificationToken(found, saved);
        assertUser(savedUser, foundUser);
    }

    private void assertVerificationToken(VerificationToken actual, VerificationToken expected) {
        assertThat(actual.getExpireDate().getDayOfYear(), is(expected.getExpireDate().getDayOfYear()));
        assertThat(actual.getToken(), is(expected.getToken()));
    }

    private void assertUser(User expected, User actual) {
        assertThat(expected.getUsername(), is(actual.getUsername()));
        assertThat(expected.getPassword(), is(actual.getPassword()));
    }

    private VerificationToken createAndSaveVerificationToken() {
        User savedUser = UserUtil.getUser();

        VerificationToken saved = new VerificationToken();
        saved.setToken("12345");
        saved.setUser(savedUser);
        saved.setExpireDate(LocalDateTime.now());

        repository.save(saved);

        return saved;
    }
}
