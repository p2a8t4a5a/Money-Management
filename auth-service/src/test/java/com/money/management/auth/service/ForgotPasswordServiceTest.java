package com.money.management.auth.service;

import com.money.management.auth.AuthApplication;
import com.money.management.auth.domain.ForgotPasswordToken;
import com.money.management.auth.domain.User;
import com.money.management.auth.repository.ForgotPasswordTokenRepository;
import com.money.management.auth.repository.UserRepository;
import com.money.management.auth.service.impl.ForgotPasswordServiceImpl;
import com.money.management.auth.util.UserUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.time.LocalDateTime;

import static org.hamcrest.core.Is.is;
import static org.hamcrest.core.IsNull.nullValue;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = AuthApplication.class)
public class ForgotPasswordServiceTest {

    @InjectMocks
    private ForgotPasswordServiceImpl service;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ForgotPasswordTokenRepository repository;

    @Mock
    private ApplicationEventPublisher eventPublisher;

    @Test
    public void shouldNotSendEmailForUnregisteredUser() {
        String email = "test@test.com";

        when(userRepository.findUsersByUsername(email)).thenReturn(null);

        assertThat(service.sendEmail(email), is("User doesn't exist, please register !"));
    }

    @Test
    public void shouldNotSendEmailToNotEnabledUser() {
        User user = UserUtil.getUser();

        when(userRepository.findUsersByUsername(user.getUsername())).thenReturn(user);

        assertThat(service.sendEmail(user.getUsername()), is("The user isn't enabled !"));
    }

    @Test
    public void shouldSendEmailForResetPassword() {
        User user = UserUtil.getUser();
        user.setEnabled(true);

        when(userRepository.findUsersByUsername(user.getUsername())).thenReturn(user);

        assertThat(service.sendEmail(user.getUsername()), is(nullValue()));
    }

    @Test
    public void shouldCreateUser() {
        User user = UserUtil.getUser();
        ForgotPasswordToken token = service.createToken(user);

        verify(repository, times(1)).save(token);

        assertThat(token.getUser(), is(user));
        assertThat(token.getExpireDate().getDayOfYear(), is(LocalDateTime.now().plusDays(1).getDayOfYear()));
    }

}
