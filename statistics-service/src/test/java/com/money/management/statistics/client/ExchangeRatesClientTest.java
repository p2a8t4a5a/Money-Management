package com.money.management.statistics.client;


import com.money.management.statistics.StatisticsApplication;
import com.money.management.statistics.domain.Currency;
import com.money.management.statistics.domain.ExchangeRatesContainer;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.time.LocalDate;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = StatisticsApplication.class)
public class ExchangeRatesClientTest {

    @Autowired
    private ExchangeRatesClient client;

    @Test
    public void shouldRetrieveExchangeRates() {
        ExchangeRatesContainer container = client.getRates(Currency.getBase());

        assertEquals(container.getDate(), LocalDate.now());
        assertEquals(container.getBase(), Currency.getBase());

        assertNotNull(container.getRates().get(Currency.USD.name()));
    }

}