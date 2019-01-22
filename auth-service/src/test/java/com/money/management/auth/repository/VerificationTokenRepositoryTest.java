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

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = AuthApplication.class)
public class VerificationTokenRepositoryTest {

    @Autowired
    private VerificationTokenRepository repository;

    @Test
    public void shouldSaveAndFindByToken() {
        User savedUser = UserUtil.getUser();

        VerificationToken saved = new VerificationToken();
        saved.setToken("12345");
        saved.setUser(savedUser);
        saved.setExpireDate(LocalDateTime.now());

        repository.save(saved);

        VerificationToken found = repository.findByToken(saved.getToken());

        assertThat(found.getExpireDate().getDayOfYear(), is(saved.getExpireDate().getDayOfYear()));
        assertThat(found.getToken(), is(saved.getToken()));

        User foundUser = found.getUser();

        assertThat(foundUser.getUsername(), is(savedUser.getUsername()));
        assertThat(foundUser.getPassword(), is(savedUser.getPassword()));
    }

}
