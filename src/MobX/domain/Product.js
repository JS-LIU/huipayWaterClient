/**
 * Created by LDQ on 2017/7/15.
 */
class Product{
    constructor(item){

        //  数量
        this.count = 1;
        //  售卖渠道
        if(item.productBasicInfo.distribute){
            this.saleWay = "distribute";
            this.id = item.productBasicInfo.distributeProductId;
        }else{
            this.saleWay = "selfSupport";
            this.id = item.productBasicInfo.selfProductId;
        }
        this.price = item.showPrice;


    }
}