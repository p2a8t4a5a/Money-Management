package com.money.management.statistics.repository;


import com.money.management.statistics.StatisticsApplication;
import com.money.management.statistics.domain.timeseries.DataPointId;
import com.money.management.statistics.repository.converter.DataPointIdReaderConverter;
import com.money.management.statistics.repository.converter.DataPointIdWriterConverter;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Date;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = StatisticsApplication.class)
public class DataPointIdConverterTest {

    @InjectMocks
    private DataPointIdReaderConverter readerConverter;

    @InjectMocks
    private DataPointIdWriterConverter writerConverter;

    @Test
    public void shouldGetDataPointId() {
        DataPointId id = readerConverter.convert(getDBObject());

        Assert.assertNotNull(id);
        Assert.assertNotNull(id.toString());
        Assert.assertEquals("1", id.getAccount());
    }

    @Test
    public void shouldGetDBObject() {
        DBObject object = writerConverter.convert(new DataPointId("1", new Date()));

        Assert.assertNotNull(object);
        Assert.assertNotNull(object.get("date"));
        Assert.assertNotNull(object.get("account"));
    }

    private DBObject getDBObject() {
        DBObject object = new BasicDBObject(2);

        object.put("date", new Date());
        object.put("account", "1");

        return object;
    }

}
