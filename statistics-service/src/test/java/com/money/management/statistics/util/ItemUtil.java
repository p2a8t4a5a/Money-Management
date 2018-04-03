package com.money.management.statistics.util;

import com.money.management.statistics.domain.Currency;
import com.money.management.statistics.domain.Item;
import com.money.management.statistics.domain.TimePeriod;

import java.math.BigDecimal;

public class ItemUtil {

    private ItemUtil() {

    }

    public static Item getItemSalary() {
        Item salary = new Item();
        salary.setTitle("Salary");
        salary.setAmount(new BigDecimal(9100));
        salary.setCurrency(Currency.USD);
        salary.setPeriod(TimePeriod.MONTH);

        return salary;
    }

    public static Item getItemGrocery() {
        Item grocery = new Item();
        grocery.setTitle("Grocery");
        grocery.setAmount(new BigDecimal(500));
        grocery.setCurrency(Currency.USD);
        grocery.setPeriod(TimePeriod.DAY);

        return grocery;
    }

    public static Item getItemVacation() {
        Item vacation = new Item();
        vacation.setTitle("Vacation");
        vacation.setAmount(new BigDecimal(3400));
        vacation.setCurrency(Currency.EUR);
        vacation.setPeriod(TimePeriod.YEAR);

        return vacation;
    }

}
