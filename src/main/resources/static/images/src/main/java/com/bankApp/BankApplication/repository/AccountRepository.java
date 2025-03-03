package com.bankApp.BankApplication.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bankApp.BankApplication.entity.Account;

public interface AccountRepository extends JpaRepository<Account, Long>{
	

}
