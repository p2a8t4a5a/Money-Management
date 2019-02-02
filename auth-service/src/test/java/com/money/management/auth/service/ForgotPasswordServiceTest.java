package com.money.management.auth.service;

import com.money.management.auth.AuthApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = AuthApplication.class)
public class ForgotPasswordServiceTest {

    @InjectMocks
    private ForgotPasswordService service;


    @Test
    private void shouldSendEmailForForgotPassword() {


    }

}
