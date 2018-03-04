package com.money.management.account.domain;

public enum Currency {

    USD, EUR;

    public static Currency getDefault() {
        return EUR;
    }
}
