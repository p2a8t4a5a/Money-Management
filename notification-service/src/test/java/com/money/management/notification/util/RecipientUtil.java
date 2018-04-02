package com.money.management.notification.util;

import com.money.management.notification.domain.NotificationSettings;
import com.money.management.notification.domain.NotificationType;
import com.money.management.notification.domain.Recipient;

import java.util.Map;

public class RecipientUtil {

    private RecipientUtil() {

    }

    public static Recipient getRecipient(Map<NotificationType, NotificationSettings> scheduledNotifications) {
        Recipient recipient = new Recipient();
        recipient.setAccountName("test");
        recipient.setEmail("test@test.com");
        recipient.setScheduledNotifications(scheduledNotifications);

        return recipient;
    }

    public static Recipient getRecipientWithError() {
        Recipient withError = new Recipient();
        withError.setAccountName("with-error");

        return withError;
    }

    public static Recipient getRecipientWithNoError() {
        Recipient withNoError = new Recipient();
        withNoError.setAccountName("with-no-error");

        return withNoError;
    }

}
