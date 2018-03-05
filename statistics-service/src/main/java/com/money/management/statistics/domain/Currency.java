package com.money.management.statistics.domain;

public enum Currency {

	USD, EUR;

	public static Currency getBase() {
		return EUR;
	}
}
