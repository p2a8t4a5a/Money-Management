package com.money.management.auth.listener;

import com.money.management.auth.AuthApplication;
import com.money.management.auth.domain.EmailType;
import com.money.management.auth.domain.ForgotPasswordToken;
import com.money.management.auth.domain.User;
import com.money.management.auth.listener.event.OnForgotPasswordCompleteEvent;
import com.money.management.auth.service.EmailService;
import com.money.management.auth.service.ForgotPasswordService;
import com.money.management.auth.util.UserUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.mail.MessagingException;

import static org.mockito.Mockito.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = AuthApplication.class)
public class ForgotPasswordListenerTest {

    @InjectMocks
    private ForgotPasswordListener listener;

    @Mock
    private ForgotPasswordService service;

    @Mock
    private EmailService emailService;

    @Test
    public void shouldSendEmail() throws MessagingException {
        User user = UserUtil.getUser();
        OnForgotPasswordCompleteEvent event = new OnForgotPasswordCompleteEvent(user);
        ForgotPasswordToken token = getToken(user);

        when(service.createToken(user)).thenReturn(token);

        listener.onApplicationEvent(event);

        verify(emailService, times(1)).send(EmailType.FORGOT_PASSWORD, user.getUsername(), token.getToken());
    }

    private ForgotPasswordToken getToken(User user) {
        ForgotPasswordToken token = new ForgotPasswordToken();
        token.setUser(user);
        token.setToken("12345");
        return token;
    }


}
