package com.money.management.auth.service;

import com.money.management.auth.domain.EmailType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.text.MessageFormat;

@Service
@RefreshScope
public class EmailServiceImpl implements EmailService {
    private final Logger log = LoggerFactory.getLogger(getClass());

    private JavaMailSender mailSender;
    private Environment env;

    @Autowired
    public EmailServiceImpl(JavaMailSender mailSender, Environment env) {
        this.env = env;
        this.mailSender = mailSender;
    }

    @Override
    public void send(EmailType type, String email, String token) throws MessagingException {
        String subject = env.getProperty(type.getSubject());
        String url = env.getProperty(type.getUrl()) + token;
        String text = MessageFormat.format(env.getProperty(type.getText()), url);

        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(email);
        helper.setSubject(subject);
        helper.setText(text);

        mailSender.send(message);

        log.info("{} email  has been send to {}", type, email);
    }
}
