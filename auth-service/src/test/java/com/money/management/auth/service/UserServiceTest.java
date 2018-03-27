package com.money.management.auth.service;

import com.money.management.auth.AuthApplication;
import com.money.management.auth.repository.UserRepository;
import com.money.management.auth.domain.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = AuthApplication.class)
@WebAppConfiguration
public class UserServiceTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Mock
    private UserRepository repository;

    @Before
    public void setup() {
        initMocks(this);
    }

    @Test
    public void shouldCreateUser() {
        User user = new User();
        user.setUsername("name");
        user.setPassword("password");

        userService.create(user);
        verify(repository, times(1)).save(user);
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldFailWhenUserAlreadyExists() {
        User user = new User();
        user.setUsername("name");
        user.setPassword("password");

        when(repository.findUsersByUsername(user.getUsername())).thenReturn(new User());
        userService.create(user);
    }
}
