import {DataPointId} from "./DataPointId";
import {ItemMetric} from "./ItemMetric";

export class DataPoint {
    id: DataPointId;
    incomes: Set<ItemMetric>;
    expenses: Set<ItemMetric>;
    statistics: Map<String, number>;
    rates: Map<String, number>;
}