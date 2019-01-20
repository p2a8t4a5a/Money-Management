package com.money.management.auth.repository;

import com.money.management.auth.domain.VerificationToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationTokenRepository extends CrudRepository<VerificationToken, String> {

    VerificationToken findByToken(String token);

}
