package com.money.management.statistics.service;

import com.money.management.statistics.domain.Account;
import com.money.management.statistics.domain.timeseries.DataPoint;

import java.text.ParseException;
import java.util.List;

public interface StatisticsService {

	/**
	 * Finds account by given name
	 *
	 * @param accountName
	 * @return found account
	 */
	List<DataPoint> findByAccountName(String accountName);

	List<DataPoint> findByAccountNameBetweenDates(String account, String beginDate, String endDate) throws ParseException;

	/**
	 * Converts given {@link Account} object to {@link DataPoint} with
	 * a set of significant statistic metrics.
	 *
	 * Compound {@link DataPoint#id} forces to rewrite the object
	 * for each account within a day.
	 *
	 * @param accountName
	 * @param account
	 */
	DataPoint save(String accountName, Account account);
}
