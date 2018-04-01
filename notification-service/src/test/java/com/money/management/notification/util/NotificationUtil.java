package com.money.management.notification.util;

import com.money.management.notification.domain.Frequency;
import com.money.management.notification.domain.NotificationSettings;

import java.util.Date;

public class NotificationUtil {

    private NotificationUtil() {

    }

    public static NotificationSettings getRemind(Date lastNotified) {
        NotificationSettings remind = new NotificationSettings();
        remind.setActive(true);
        remind.setFrequency(Frequency.WEEKLY);
        remind.setLastNotified(lastNotified);

        return remind;
    }


    public static NotificationSettings getBackup() {
        NotificationSettings backup = new NotificationSettings();
        backup.setActive(false);
        backup.setFrequency(Frequency.MONTHLY);
        backup.setLastNotified(new Date());

        return backup;
    }

}
