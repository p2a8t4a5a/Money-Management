package com.money.management.account.client;

import com.money.management.account.domain.Account;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "statistics-service")
public interface StatisticsServiceClient {

    @RequestMapping(method = RequestMethod.PUT, value = "/statistics/find", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    void updateStatistics(@RequestParam("name") String accountName, Account account);

}
