import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class IconService {

    constructor() {
    }

    public static getExpenseIcons(): String[] {
        return ['car', 'clothes', 'gift', 'house', 'learning', 'grocery', 'vacation', 'restaurant', 'gym', 'phone', 'repair'];
    }

    public static getIncomeIcons(): String[] {
        return ['salary', 'interest', 'sell'];
    }

    public getIcon(name: String): String {
        return "../../assets/img/" + name + ".svg"
    }

}
