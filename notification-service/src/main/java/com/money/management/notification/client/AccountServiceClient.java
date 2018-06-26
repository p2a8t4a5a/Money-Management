package com.money.management.notification.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "account-service")
public interface AccountServiceClient {

    @RequestMapping(method = RequestMethod.GET, value = "/accounts/find", consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    String getAccount(@RequestParam("name") String accountName);

}
