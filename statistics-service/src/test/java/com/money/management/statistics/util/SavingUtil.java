package com.money.management.statistics.util;

import com.money.management.statistics.domain.Currency;
import com.money.management.statistics.domain.Saving;

import java.math.BigDecimal;

public class SavingUtil {

    private SavingUtil() {

    }

    public static Saving getSaving() {
        Saving saving = new Saving();
        saving.setAmount(new BigDecimal(1000));
        saving.setCurrency(Currency.EUR);
        saving.setInterest(new BigDecimal(3.2));
        saving.setDeposit(true);
        saving.setCapitalization(false);

        return saving;
    }

}
