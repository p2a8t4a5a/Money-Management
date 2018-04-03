package com.money.management.statistics.util;

import com.google.common.collect.ImmutableList;
import com.money.management.statistics.domain.Account;
import com.money.management.statistics.domain.Item;
import com.money.management.statistics.domain.Saving;

import java.util.Arrays;

public class AccountUtil {

    private AccountUtil() {

    }

    public static Account getAccount(Saving saving, Item incomes, Item... expenses) {
        Account account = new Account();
        account.setSaving(saving);
        account.setExpenses(Arrays.asList(expenses));
        account.setIncomes(ImmutableList.of(incomes));

        return account;
    }

}
