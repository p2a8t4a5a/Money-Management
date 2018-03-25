package com.money.management.account.util;

import com.money.management.account.domain.Currency;
import com.money.management.account.domain.Item;
import com.money.management.account.domain.TimePeriod;

import java.math.BigDecimal;

public class ItemUtil {

    public static Item getVacation() {
        Item vacation = new Item();
        vacation.setTitle("Vacation");
        vacation.setAmount(new BigDecimal(3400));
        vacation.setCurrency(Currency.EUR);
        vacation.setPeriod(TimePeriod.YEAR);
        vacation.setIcon("tourism");

        return vacation;
    }

    public static Item getGrocery() {
        Item grocery = new Item();
        grocery.setTitle("Grocery");
        grocery.setAmount(new BigDecimal(10));
        grocery.setCurrency(Currency.USD);
        grocery.setPeriod(TimePeriod.DAY);
        grocery.setIcon("meal");

        return grocery;
    }

    public static Item getSalary() {
        Item salary = new Item();
        salary.setTitle("Salary");
        salary.setAmount(new BigDecimal(9100));
        salary.setCurrency(Currency.USD);
        salary.setPeriod(TimePeriod.MONTH);
        salary.setIcon("wallet");

        return salary;
    }

}
