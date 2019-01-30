package com.money.management.auth.listener;

import com.money.management.auth.AuthApplication;
import com.money.management.auth.domain.EmailType;
import com.money.management.auth.domain.User;
import com.money.management.auth.domain.VerificationToken;
import com.money.management.auth.listener.event.OnResendVerificationEmailCompleteEvent;
import com.money.management.auth.service.EmailService;
import com.money.management.auth.util.UserUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.mail.MessagingException;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = AuthApplication.class)
public class ResendVerificationEmailListenerTest {

    @InjectMocks
    private ResendVerificationEmailListener registrationListener;

    @Mock
    private EmailService emailService;

    @Test
    public void shouldSendEmail() throws MessagingException {
        User user = UserUtil.getUser();

        VerificationToken token = new VerificationToken();
        token.setUser(user);
        token.setToken("12345");

        OnResendVerificationEmailCompleteEvent event = new OnResendVerificationEmailCompleteEvent(token);

        registrationListener.onApplicationEvent(event);

        verify(emailService, times(1)).send(EmailType.VERIFICATION, user.getUsername(), token.getToken());
    }

}
