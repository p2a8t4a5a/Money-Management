import {Item} from "./Item";
import {Saving} from "./Saving";

export class Account {
    name: String;
    lastSeen: Date;
    incomes: Item[];
    expenses: Item[];
    saving: Saving;
    note: String;
}