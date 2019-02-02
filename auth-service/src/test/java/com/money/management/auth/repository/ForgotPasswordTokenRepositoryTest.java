package com.money.management.auth.repository;

import com.money.management.auth.AuthApplication;
import com.money.management.auth.domain.ForgotPasswordToken;
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
public class ForgotPasswordTokenRepositoryTest {

    @Autowired
    private ForgotPasswordTokenRepository repository;

    @Test
    public void shouldSaveAndFindForgotPasswordById() {
        ForgotPasswordToken saved = new ForgotPasswordToken();
        saved.setToken("12345");
        saved.setExpireDate(LocalDateTime.now());
        saved.setUser(UserUtil.getUser());

        repository.save(saved);

        ForgotPasswordToken found = repository.findById(saved.getToken()).get();

        assertThat(saved, is(saved));
    }

}
