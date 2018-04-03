package com.money.management.statistics.util;

import com.google.common.collect.Sets;
import com.money.management.statistics.domain.timeseries.DataPoint;
import com.money.management.statistics.domain.timeseries.DataPointId;
import com.money.management.statistics.domain.timeseries.ItemMetric;
import com.money.management.statistics.domain.timeseries.StatisticMetric;

import java.math.BigDecimal;
import java.util.Date;
import java.util.Map;

public class DataPointUtil {

    private DataPointUtil() {

    }

    public static DataPoint getDataPoint(Map<StatisticMetric, BigDecimal> statistics, ItemMetric income, ItemMetric... expenses) {
        DataPointId pointId = new DataPointId("test-account", new Date(0));
        DataPoint point = new DataPoint();
        point.setId(pointId);
        point.setIncomes(Sets.newHashSet(income));
        point.setExpenses(Sets.newHashSet(expenses));
        point.setStatistics(statistics);

        return point;
    }

}
