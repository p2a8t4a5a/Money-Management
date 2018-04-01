package com.money.management.notification.repository;

import com.google.common.collect.ImmutableMap;
import com.money.management.notification.domain.Frequency;
import com.money.management.notification.domain.NotificationSettings;
import com.money.management.notification.domain.NotificationType;
import com.money.management.notification.NotificationServiceApplication;
import com.money.management.notification.domain.Recipient;
import com.money.management.notification.util.NotificationUtil;
import org.apache.commons.lang.time.DateUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.Date;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = NotificationServiceApplication.class)
@WebAppConfiguration
public class RecipientRepositoryTest {

    @Autowired
    private RecipientRepository repository;

    @Test
    public void shouldFindByAccountName() {
        Recipient recipient = new Recipient();
        recipient.setAccountName("test");
        recipient.setEmail("test@test.com");
        recipient.setScheduledNotifications(ImmutableMap.of(
                NotificationType.BACKUP, NotificationUtil.getBackup(),
                NotificationType.REMIND, NotificationUtil.getRemind(new Date(0))
        ));

        repository.save(recipient);

        Recipient found = repository.findByAccountName(recipient.getAccountName());
        assertEquals(recipient.getAccountName(), found.getAccountName());
        assertEquals(recipient.getEmail(), found.getEmail());

        assertEquals(recipient.getScheduledNotifications().get(NotificationType.BACKUP).getActive(),
                found.getScheduledNotifications().get(NotificationType.BACKUP).getActive());
        assertEquals(recipient.getScheduledNotifications().get(NotificationType.BACKUP).getFrequency(),
                found.getScheduledNotifications().get(NotificationType.BACKUP).getFrequency());
        assertEquals(recipient.getScheduledNotifications().get(NotificationType.BACKUP).getLastNotified(),
                found.getScheduledNotifications().get(NotificationType.BACKUP).getLastNotified());

        assertEquals(recipient.getScheduledNotifications().get(NotificationType.REMIND).getActive(),
                found.getScheduledNotifications().get(NotificationType.REMIND).getActive());
        assertEquals(recipient.getScheduledNotifications().get(NotificationType.REMIND).getFrequency(),
                found.getScheduledNotifications().get(NotificationType.REMIND).getFrequency());
        assertEquals(recipient.getScheduledNotifications().get(NotificationType.REMIND).getLastNotified(),
                found.getScheduledNotifications().get(NotificationType.REMIND).getLastNotified());
    }

    @Test
    public void shouldFindReadyForRemindWhenFrequencyIsWeeklyAndLastNotifiedWas8DaysAgo() {
        Recipient recipient = new Recipient();
        recipient.setAccountName("test");
        recipient.setEmail("test@test.com");
        recipient.setScheduledNotifications(ImmutableMap.of(
                NotificationType.REMIND, NotificationUtil.getRemind(DateUtils.addDays(new Date(), -8))
        ));

        repository.save(recipient);

        List<Recipient> found = repository.findReadyForRemind();
        assertFalse(found.isEmpty());
    }

    @Test
    public void shouldNotFindReadyForRemindWhenFrequencyIsWeeklyAndLastNotifiedWasYesterday() {
        Recipient recipient = new Recipient();
        recipient.setAccountName("test");
        recipient.setEmail("test@test.com");
        recipient.setScheduledNotifications(ImmutableMap.of(
                NotificationType.REMIND, NotificationUtil.getRemind(DateUtils.addDays(new Date(), -1))
        ));

        repository.save(recipient);

        List<Recipient> found = repository.findReadyForRemind();
        assertTrue(found.isEmpty());
    }

    @Test
    public void shouldNotFindReadyForRemindWhenNotificationIsNotActive() {
        NotificationSettings remind = NotificationUtil.getRemind(DateUtils.addDays(new Date(), -30));
        remind.setActive(false);

        Recipient recipient = new Recipient();
        recipient.setAccountName("test");
        recipient.setEmail("test@test.com");
        recipient.setScheduledNotifications(ImmutableMap.of(
                NotificationType.REMIND, remind
        ));

        repository.save(recipient);

        List<Recipient> found = repository.findReadyForRemind();
        assertTrue(found.isEmpty());
    }

    @Test
    public void shouldNotFindReadyForBackupWhenFrequencyIsQuaterly() {
        NotificationSettings remind = NotificationUtil.getRemind(DateUtils.addDays(new Date(), -91));
        remind.setFrequency(Frequency.QUARTERLY);

        Recipient recipient = new Recipient();
        recipient.setAccountName("test");
        recipient.setEmail("test@test.com");
        recipient.setScheduledNotifications(ImmutableMap.of(
                NotificationType.BACKUP, remind
        ));

        repository.save(recipient);

        List<Recipient> found = repository.findReadyForBackup();
        assertFalse(found.isEmpty());
    }
}