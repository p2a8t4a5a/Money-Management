package com.piggymetrics.account.domain;

public enum Currency {

    USD, EUR;

    public static Currency getDefault() {
        return EUR;
    }
}
