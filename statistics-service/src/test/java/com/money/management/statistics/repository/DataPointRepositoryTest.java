package com.money.management.statistics.repository;

import com.google.common.collect.ImmutableMap;
import com.money.management.statistics.StatisticsApplication;
import com.money.management.statistics.domain.timeseries.DataPoint;
import com.money.management.statistics.domain.timeseries.ItemMetric;
import com.money.management.statistics.domain.timeseries.StatisticMetric;
import com.money.management.statistics.util.DataPointUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = StatisticsApplication.class)
public class DataPointRepositoryTest {

    @Autowired
    private DataPointRepository repository;

    @Test
    public void shouldGetDataPointsBetweenDates() {
        DataPoint point = createDataPoint();
        repository.save(createDataPoint());
        List<DataPoint> points;

        points = repository.findByIdAccountBetweenDates(point.getId().getAccount(), new Date(-1), new Date(1));
        assertEquals(1, points.size());
        areEquals(point, points.get(0));

        points = repository.findByIdAccountBetweenDates(point.getId().getAccount(), new Date(0), new Date(1));
        assertEquals(1, points.size());
        areEquals(point, points.get(0));

        points = repository.findByIdAccountBetweenDates(point.getId().getAccount(), new Date(-1), new Date(0));
        assertEquals(1, points.size());
        areEquals(point, points.get(0));

        points = repository.findByIdAccountBetweenDates(point.getId().getAccount(), new Date(0), new Date(0));
        assertEquals(1, points.size());
        areEquals(point, points.get(0));

        points = repository.findByIdAccountBetweenDates(point.getId().getAccount(), new Date(1), new Date(2));
        assertEquals(0, points.size());

        points = repository.findByIdAccountBetweenDates(point.getId().getAccount(), new Date(1), new Date(-1));
        assertEquals(0, points.size());
    }

    @Test
    public void shouldSaveDataPoint() {
        DataPoint point = createDataPoint();
        repository.save(point);

        List<DataPoint> points = repository.findByIdAccount(point.getId().getAccount());

        assertEquals(1, points.size());
        areEquals(point, points.get(0));
    }

    @Test
    public void shouldRewriteDataPointWithinADay() {
        BigDecimal lateAmount = new BigDecimal(200);

        DataPoint earlier = DataPointUtil.getDataPoint(ImmutableMap.of(
                StatisticMetric.SAVING_AMOUNT, new BigDecimal(100)
        ), null);

        repository.save(earlier);

        DataPoint later = DataPointUtil.getDataPoint(ImmutableMap.of(
                StatisticMetric.SAVING_AMOUNT, lateAmount
        ), null);

        repository.save(later);

        List<DataPoint> points = repository.findByIdAccount(later.getId().getAccount());

        assertEquals(1, points.size());
        assertEquals(lateAmount, points.get(0).getStatistics().get(StatisticMetric.SAVING_AMOUNT));
    }

    private DataPoint createDataPoint() {
        ItemMetric salary = new ItemMetric("salary", new BigDecimal(20_000));
        ItemMetric grocery = new ItemMetric("grocery", new BigDecimal(1_000));
        ItemMetric vacation = new ItemMetric("vacation", new BigDecimal(2_000));

        return DataPointUtil.getDataPoint(ImmutableMap.of(
                StatisticMetric.SAVING_AMOUNT, new BigDecimal(400_000),
                StatisticMetric.INCOMES_AMOUNT, new BigDecimal(20_000),
                StatisticMetric.EXPENSES_AMOUNT, new BigDecimal(3_000)
        ), salary, grocery, vacation);
    }

    private void areEquals(DataPoint dataPoint1, DataPoint dataPoint2) {
        assertEquals(dataPoint1.getId().getDate(), dataPoint2.getId().getDate());
        assertEquals(dataPoint1.getStatistics().size(), dataPoint2.getStatistics().size());
        assertEquals(dataPoint1.getIncomes().size(), dataPoint2.getIncomes().size());
        assertEquals(dataPoint1.getExpenses().size(), dataPoint2.getExpenses().size());
    }

}
