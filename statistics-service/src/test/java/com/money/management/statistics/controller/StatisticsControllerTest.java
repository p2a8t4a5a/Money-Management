package com.money.management.statistics.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableList;
import com.money.management.statistics.StatisticsApplication;
import com.money.management.statistics.domain.*;
import com.money.management.statistics.domain.timeseries.DataPoint;
import com.money.management.statistics.domain.timeseries.DataPointId;
import com.money.management.statistics.service.StatisticsService;
import com.money.management.statistics.util.AccountUtil;
import com.money.management.statistics.util.ItemUtil;
import com.money.management.statistics.util.SavingUtil;
import com.sun.security.auth.UserPrincipal;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Date;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = StatisticsApplication.class)
@WebAppConfiguration
public class StatisticsControllerTest {

    private static final ObjectMapper mapper = new ObjectMapper();

    @InjectMocks
    private StatisticsController statisticsController;

    @Mock
    private StatisticsService statisticsService;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        initMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(statisticsController).build();
    }

    @Test
    public void shouldGetStatisticsByAccountName() throws Exception {
        DataPoint dataPoint = new DataPoint();
        dataPoint.setId(new DataPointId("test", new Date()));

        when(statisticsService.findByAccountName(dataPoint.getId().getAccount())).thenReturn(ImmutableList.of(dataPoint));

        mockMvc.perform(get("/test").principal(new UserPrincipal(dataPoint.getId().getAccount())))
                .andExpect(jsonPath("$[0].id.account").value(dataPoint.getId().getAccount()))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldGetCurrentAccountStatistics() throws Exception {
        DataPoint dataPoint = new DataPoint();
        dataPoint.setId(new DataPointId("test", new Date()));

        when(statisticsService.findByAccountName(dataPoint.getId().getAccount())).thenReturn(ImmutableList.of(dataPoint));

        mockMvc.perform(get("/current").principal(new UserPrincipal(dataPoint.getId().getAccount())))
                .andExpect(jsonPath("$[0].id.account").value(dataPoint.getId().getAccount()))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldSaveAccountStatistics() throws Exception {
        Saving saving = SavingUtil.getSaving();
        Item grocery = ItemUtil.getItemGrocery();
        Item salary = ItemUtil.getItemSalary();
        Account account = AccountUtil.getAccount(saving, salary, grocery);

        String json = mapper.writeValueAsString(account);

        mockMvc.perform(put("/test").contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isOk());

        verify(statisticsService, times(1)).save(anyString(), any(Account.class));
    }
}