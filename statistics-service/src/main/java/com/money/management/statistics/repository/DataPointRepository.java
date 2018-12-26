package com.money.management.statistics.repository;

import com.money.management.statistics.domain.timeseries.DataPoint;
import com.money.management.statistics.domain.timeseries.DataPointId;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface DataPointRepository extends CrudRepository<DataPoint, DataPointId> {

    List<DataPoint> findByIdAccount(String account);

    @Query("{ $and: [{'id.account': { $eq: ?0 }}, {'id.date': {$gte: ?1, $lte: ?2}}]}")
    List<DataPoint> findByIdAccountBetweenDates(String account, Date beginDate, Date endDate);
}
