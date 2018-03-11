package com.money.management.notification.service;

import com.google.common.collect.ImmutableList;
import com.money.management.notification.NotificationServiceApplication;
import com.money.management.notification.client.AccountServiceClient;
import com.money.management.notification.domain.NotificationType;
import com.money.management.notification.domain.Recipient;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import javax.mail.MessagingException;
import java.io.IOException;

import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = NotificationServiceApplication.class)
@WebAppConfiguration
public class NotificationServiceImplTest {

    @InjectMocks
    private NotificationServiceImpl notificationService;

    @Mock
    private RecipientService recipientService;

    @Mock
    private AccountServiceClient client;

    @Mock
    private EmailService emailService;

    @Before
    public void setup() {
        initMocks(this);
    }

    @Test
    public void shouldSendBackupNotificationsEvenWhenErrorsOccursForSomeRecipients() throws IOException, MessagingException {
        final String attachment = "json";

        Recipient withError = new Recipient();
        withError.setAccountName("with-error");

        Recipient withNoError = new Recipient();
        withNoError.setAccountName("with-no-error");

        when(client.getAccount(withError.getAccountName())).thenThrow(new RuntimeException());
        when(client.getAccount(withNoError.getAccountName())).thenReturn(attachment);

        when(recipientService.findReadyToNotify(NotificationType.BACKUP)).thenReturn(ImmutableList.of(withNoError, withError));

        notificationService.sendBackupNotifications();

        verify(emailService, timeout(100)).send(NotificationType.BACKUP, withNoError, attachment);
        verify(recipientService, timeout(100)).markNotified(NotificationType.BACKUP, withNoError);

        verify(recipientService, never()).markNotified(NotificationType.BACKUP, withError);
    }

    @Test
    public void shouldSendRemindNotificationsEvenWhenErrorsOccursForSomeRecipients() throws IOException, MessagingException {
        Recipient withError = new Recipient();
        withError.setAccountName("with-error");

        Recipient withNoError = new Recipient();
        withNoError.setAccountName("with-no-error");

        when(recipientService.findReadyToNotify(NotificationType.REMIND)).thenReturn(ImmutableList.of(withNoError, withError));
        doThrow(new RuntimeException()).when(emailService).send(NotificationType.REMIND, withError, null);

        notificationService.sendRemindNotifications();

        verify(emailService, timeout(100)).send(NotificationType.REMIND, withNoError, null);
        verify(recipientService, timeout(100)).markNotified(NotificationType.REMIND, withNoError);

        verify(recipientService, never()).markNotified(NotificationType.REMIND, withError);
    }
}