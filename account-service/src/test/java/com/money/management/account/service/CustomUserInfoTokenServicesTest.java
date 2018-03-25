package com.money.management.account.service;

import com.money.management.account.AccountApplication;
import com.money.management.account.service.security.CustomUserInfoTokenServices;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.oauth2.common.exceptions.InvalidTokenException;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = AccountApplication.class)
public class CustomUserInfoTokenServicesTest {
    private static final String userInfoEndpointUrl = "http://auth-service:5000/uaa/oauth/token";
    private static final String clientId = "account-service";
    private CustomUserInfoTokenServices userInfoTokenServices;

    @Before
    public void before() {
        this.userInfoTokenServices = new CustomUserInfoTokenServices(userInfoEndpointUrl, clientId);
    }

    @Test(expected = InvalidTokenException.class)
    public void shouldThrowInvalidToken() {
        this.userInfoTokenServices.loadAuthentication("test123");
    }

    @Test(expected = UnsupportedOperationException.class)
    public void shouldReturnUnsupportedOperation() {
        this.userInfoTokenServices.readAccessToken("test123");
    }

}
