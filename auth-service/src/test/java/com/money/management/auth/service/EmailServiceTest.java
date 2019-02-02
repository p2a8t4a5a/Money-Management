package com.money.management.auth.service;

import com.money.management.auth.AuthApplication;
import com.money.management.auth.domain.EmailType;
import com.money.management.auth.service.impl.EmailServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.MimeMessage;

import java.util.Properties;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = AuthApplication.class)
public class EmailServiceTest {

    @InjectMocks
    private EmailServiceImpl emailService;

    @Mock
    private JavaMailSender mailSender;

    @Mock
    private Environment env;

    @Captor
    private ArgumentCaptor<MimeMessage> captor;

    @Before
    public void setup() {
        initMocks(this);
        when(mailSender.createMimeMessage())
                .thenReturn(new MimeMessage(Session.getDefaultInstance(new Properties())));
    }

    @Test
    public void shouldSendEmail() throws MessagingException {
        EmailType type = EmailType.VERIFICATION;
        String subject = "Subject";

        when(env.getProperty(type.getSubject())).thenReturn(subject);
        when(env.getProperty(type.getUrl())).thenReturn("http://test.com?token=");
        when(env.getProperty(type.getText())).thenReturn("Test {0} test");

        emailService.send(EmailType.VERIFICATION, "test@test.com", "12345");

        verify(mailSender).send(captor.capture());

        MimeMessage message = captor.getValue();
        assertEquals(subject, message.getSubject());
    }


}
