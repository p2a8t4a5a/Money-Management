package com.money.management.account.util;

import com.money.management.account.domain.Account;
import com.money.management.account.domain.Item;

import java.util.Arrays;
import java.util.Collections;
import java.util.Date;

public class AccountUtil {

    public static Account getAccount(Item... expenses) {
        Account account = new Account();
        account.setName("test");
        account.setNote("test note");
        account.setLastSeen(new Date());
        account.setSaving(SavingUtil.getSaving());
        account.setIncomes(Collections.singletonList(ItemUtil.getSalary()));
        account.setExpenses(Arrays.asList(expenses));

        return account;
    }

}
