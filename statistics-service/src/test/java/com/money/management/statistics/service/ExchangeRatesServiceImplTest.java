package com.money.management.statistics.service;

import com.google.common.collect.ImmutableMap;
import com.money.management.statistics.StatisticsApplication;
import com.money.management.statistics.client.ExchangeRatesClient;
import com.money.management.statistics.domain.Currency;
import com.money.management.statistics.domain.ExchangeRatesContainer;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigDecimal;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = StatisticsApplication.class)
public class ExchangeRatesServiceImplTest {

    @InjectMocks
    private ExchangeRatesServiceImpl ratesService;

    @Mock
    private ExchangeRatesClient client;

    @Before
    public void setup() {
        initMocks(this);
    }

    @Test
    public void shouldReturnCurrentRatesWhenContainerIsEmptySoFar() {

        ExchangeRatesContainer container = new ExchangeRatesContainer();
        container.setRates(ImmutableMap.of(
                Currency.EUR.name(), new BigDecimal("0.8"),
                Currency.USD.name(), new BigDecimal("80")
        ));

        when(client.getRates(Currency.getBase())).thenReturn(container);

        Map<Currency, BigDecimal> result = ratesService.getCurrentRates();
        verify(client, times(1)).getRates(Currency.getBase());

        assertEquals(container.getRates().get(Currency.EUR.name()), result.get(Currency.EUR));
        assertEquals(BigDecimal.ONE, result.get(Currency.USD));
    }

    @Test
    public void shouldNotRequestRatesWhenTodayContainerAlreadyExists() {

        ExchangeRatesContainer container = new ExchangeRatesContainer();
        container.setRates(ImmutableMap.of(
                Currency.EUR.name(), new BigDecimal("0.8"),
                Currency.USD.name(), new BigDecimal("80")
        ));
        when(client.getRates(Currency.getBase())).thenReturn(container);

        ratesService.getCurrentRates();

        ratesService.getCurrentRates();

        verify(client, times(1)).getRates(Currency.getBase());
    }

    @Test
    public void shouldConvertCurrency() {
        ExchangeRatesContainer container = new ExchangeRatesContainer();
        container.setRates(ImmutableMap.of(
                Currency.EUR.name(), new BigDecimal("0.8"),
                Currency.USD.name(), new BigDecimal("80")
        ));

        when(client.getRates(Currency.getBase())).thenReturn(container);

        final BigDecimal amount = new BigDecimal(100);
        final BigDecimal expectedConversion = new BigDecimal("80.00");

        BigDecimal result = ratesService.convert(Currency.USD, Currency.EUR, amount);

        assertTrue(expectedConversion.compareTo(result) == 0);
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldFailToConvertWhenAmountIsNull() {
        ratesService.convert(Currency.EUR, Currency.USD, null);
    }
}