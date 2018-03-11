package com.money.management.auth.repository;

import com.money.management.auth.AuthApplication;
import com.money.management.auth.domain.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import static org.junit.Assert.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = AuthApplication.class)
@WebAppConfiguration
public class UserRepositoryTest {

    @Autowired
    private UserRepository repository;

    @Test
    public void shouldSaveAndFindUserByName() {

        User user = new User();
        user.setUsername("name");
        user.setPassword("password");
        repository.save(user);

        User found = repository.findUsersByUsername(user.getUsername());
        assertEquals(user.getUsername(), found.getUsername());
        assertEquals(user.getPassword(), found.getPassword());
    }
}
