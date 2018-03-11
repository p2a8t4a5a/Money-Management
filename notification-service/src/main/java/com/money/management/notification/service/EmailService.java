package com.money.management.notification.service;

import com.money.management.notification.domain.NotificationType;
import com.money.management.notification.domain.Recipient;

import javax.mail.MessagingException;

public interface EmailService {

	void send(NotificationType type, Recipient recipient, String attachment) throws MessagingException;

}
