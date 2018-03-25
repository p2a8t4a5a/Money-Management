package com.money.management.account.util;

import com.money.management.account.domain.Currency;
import com.money.management.account.domain.Saving;

import java.math.BigDecimal;

public class SavingUtil {

    public static Saving getSaving() {
        Saving saving = new Saving();
        saving.setAmount(new BigDecimal(1500));
        saving.setCurrency(Currency.USD);
        saving.setInterest(new BigDecimal("3.32"));
        saving.setDeposit(true);
        saving.setCapitalization(false);

        return saving;
    }

}
