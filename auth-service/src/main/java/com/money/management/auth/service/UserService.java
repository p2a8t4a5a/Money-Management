package com.money.management.auth.service;

import com.money.management.auth.domain.User;

public interface UserService {

    void create(User user);

    void changePassword(String name, String password);
}
