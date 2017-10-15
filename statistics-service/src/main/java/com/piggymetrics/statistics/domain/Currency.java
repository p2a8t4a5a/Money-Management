package com.piggymetrics.statistics.domain;

public enum Currency {

	USD, EUR;

	public static Currency getBase() {
		return EUR;
	}
}
