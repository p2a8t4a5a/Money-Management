package com.money.management.auth.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.money.management.auth.AuthApplication;
import com.money.management.auth.domain.User;
import com.money.management.auth.service.ForgotPasswordService;
import com.money.management.auth.service.UserService;
import com.money.management.auth.service.VerificationTokenService;
import com.money.management.auth.util.UserUtil;
import com.sun.security.auth.UserPrincipal;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = AuthApplication.class)
@WebAppConfiguration
public class UserControllerTest {

    private static final String MESSAGE = "TEST";
    private static final String EMAIL = "test@test.com";

    private static final ObjectMapper mapper = new ObjectMapper();

    @InjectMocks
    private UserController accountController;

    @Mock
    private UserService userService;

    @Mock
    private VerificationTokenService verificationTokenService;

    @Mock
    private ForgotPasswordService forgotPasswordService;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        initMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(accountController).build();
    }

    @Test
    public void shouldCreateNewUser() throws Exception {
        User user = UserUtil.getUser();

        String json = mapper.writeValueAsString(user);

        mockMvc.perform(post("/users/create").contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldFailWhenUserIsNotValid() throws Exception {
        mockMvc.perform(post("/users/create"))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void shouldReturnCurrentUser() throws Exception {
        mockMvc.perform(get("/users/current").principal(new UserPrincipal("test")))
                .andExpect(jsonPath("$.name").value("test"))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldReturnConfirmationMessage() throws Exception {
        when(verificationTokenService.enableUser("12345")).thenReturn(MESSAGE);

        mockMvc.perform(get("/users/verification?token=12345"))
                .andExpect(content().string(MESSAGE))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldResendVerificationEmail() throws Exception {
        when(verificationTokenService.resendMailVerification(EMAIL)).thenReturn(MESSAGE);

        mockMvc.perform(get("/users/verification/resend?email=" + EMAIL))
                .andExpect(content().string(MESSAGE))
                .andExpect(status().isOk());
    }


    @Test
    public void shouldSendForgotPasswordUrl() throws Exception {
        when(forgotPasswordService.sendEmail(EMAIL)).thenReturn(MESSAGE);

        mockMvc.perform(get("/users/password/forgot?email=" + EMAIL))
                .andExpect(content().string(MESSAGE))
                .andExpect(status().isOk());
    }

}
