import {observable, computed,action,autorun} from "mobx";


class TicketProduct {
    constructor(shopProduct) {
        this.shopProduct = shopProduct;
    }

    selectedSellStrategy() {
        console.log('selectedSellStrategy')
    }
}
module.exports = TicketProduct;