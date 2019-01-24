package com.money.management.auth.service;

import com.money.management.auth.AuthApplication;
import com.money.management.auth.domain.User;
import com.money.management.auth.domain.VerificationToken;
import com.money.management.auth.repository.UserRepository;
import com.money.management.auth.repository.VerificationTokenRepository;
import com.money.management.auth.util.UserUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.time.LocalDateTime;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = AuthApplication.class)
public class VerificationTokenTest {

    private static final String TOKEN = "12345";

    @InjectMocks
    private VerificationTokenServiceImpl service;

    @Mock
    private VerificationTokenRepository verificationTokenRepository;

    @Mock
    private UserRepository userRepository;

    @Captor
    private ArgumentCaptor<User> captor;

    @Test
    public void shouldCreateUser() {
        User user = UserUtil.getUser();
        VerificationToken token = service.create(user);

        verify(verificationTokenRepository, times(1)).save(token);

        assertThat(token.getUser(), is(user));
        assertThat(token.getExpireDate().getDayOfYear(), is(LocalDateTime.now().plusDays(1).getDayOfYear()));
    }


    @Test
    public void shouldEnableUser() {
        VerificationToken verificationToken = getVerificationToken(LocalDateTime.now().plusDays(1));
        String message = executeEnableUser(verificationToken);

        verify(userRepository).save(captor.capture());

        User enableUser = captor.getValue();

        assertThat(message, is("The user was enabled, you can now login in the application !"));
        assertThat(enableUser.isEnabled(), is(true));
    }

    @Test
    public void invalidToken() {
        String message = executeEnableUser(null);
        assertThat(message, is("Invalid Token !"));
    }

    @Test
    public void verificationTokeHasExpired() {
        VerificationToken verificationToken = getVerificationToken(LocalDateTime.now());
        String message = executeEnableUser(verificationToken);

        assertThat(message, is("Verification toke has expired !"));
    }

    @Test
    public void userIsAlreadyEnabled() {
        VerificationToken verificationToken = getVerificationToken(LocalDateTime.now().plusDays(1));
        verificationToken.getUser().setEnabled(true);
        String message = executeEnableUser(verificationToken);

        assertThat(message, is("The user is already enabled !"));
    }

    private String executeEnableUser(VerificationToken verificationToken) {
        when(verificationTokenRepository.findByToken(TOKEN)).thenReturn(verificationToken);
        return service.enableUser(TOKEN);
    }

    private VerificationToken getVerificationToken(LocalDateTime localDateTime) {
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setExpireDate(localDateTime);
        verificationToken.setUser(UserUtil.getUser());
        verificationToken.setToken(TOKEN);

        return verificationToken;
    }
}
