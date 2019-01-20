package com.money.management.auth.domain;

public enum EmailType {
    VERIFICATION("verification.email.subject", "verification.email.text", "verification.email.url");

    private String subject;
    private String text;
    private String url;

    EmailType(String subject, String text, String url) {
        this.subject = subject;
        this.text = text;
        this.url = url;
    }

    public String getSubject() {
        return subject;
    }

    public String getText() {
        return text;
    }

    public String getUrl() {
        return url;
    }
}
