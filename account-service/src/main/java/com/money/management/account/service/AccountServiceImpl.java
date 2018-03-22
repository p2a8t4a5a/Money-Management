package com.money.management.account.service;

import com.money.management.account.repository.AccountRepository;
import com.money.management.account.client.AuthServiceClient;
import com.money.management.account.client.StatisticsServiceClient;
import com.money.management.account.domain.Account;
import com.money.management.account.domain.Currency;
import com.money.management.account.domain.Saving;
import com.money.management.account.domain.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.math.BigDecimal;
import java.util.Date;

@Service
public class AccountServiceImpl implements AccountService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private StatisticsServiceClient statisticsClient;
    private AuthServiceClient authClient;
    private AccountRepository repository;

    @Autowired
    public AccountServiceImpl(StatisticsServiceClient statisticsClient, AuthServiceClient authClient, AccountRepository repository) {
        this.statisticsClient = statisticsClient;
        this.authClient = authClient;
        this.repository = repository;
    }


    @Override
    public Account findByName(String accountName) {
        Assert.hasLength(accountName, "Account name is empty !");
        return repository.findByName(accountName);
    }

    @Override
    public Account create(User user) {
        Account existing = repository.findByName(user.getUsername());
        Assert.isNull(existing, "Account already exists: " + user.getUsername());

        authClient.createUser(user);
        Account account = createAccount(user);
        repository.save(account);

        log.info("New account has been created: " + account.getName());

        return account;
    }

    @Override
    public void saveChanges(String name, Account update) {
        Account account = repository.findByName(name);
        Assert.notNull(account, "Can't find account with name " + name);

        updateAccount(account, update);
        repository.save(account);

        log.debug("Account {} changes has been saved", name);

        statisticsClient.updateStatistics(name, account);
    }

    private Saving getDefaultSaving() {
        Saving saving = new Saving();
        saving.setAmount(new BigDecimal(0));
        saving.setCurrency(Currency.getDefault());
        saving.setInterest(new BigDecimal(0));
        saving.setDeposit(false);
        saving.setCapitalization(false);

        return saving;
    }

    private Account createAccount(User user) {
        Account account = new Account();
        account.setName(user.getUsername());
        account.setLastSeen(new Date());
        account.setSaving(getDefaultSaving());

        return account;
    }

    private void updateAccount(Account account, Account update) {
        account.setIncomes(update.getIncomes());
        account.setExpenses(update.getExpenses());
        account.setSaving(update.getSaving());
        account.setNote(update.getNote());
        account.setLastSeen(new Date());
    }

}
