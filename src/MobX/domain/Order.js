/**
 * Created by LDQ on 2017/6/29.
 */
import {observable, computed} from "mobx";

class Order {
    @observable price = 0;
    @observable amount = 1;

    constructor(price,amount) {
        this.price = price;
        this.amount = amount;
    }

    @computed get total() {
        return this.price * this.amount;
    }
}
module.exports = Order;