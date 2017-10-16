/**
 * Created by LDQ on 2017/10/16
 */
class Currency{
    constructor(max,current,min = 0){

        this.max = max;
        this.min = min;
        this.current = current;
    }
    reduce(step){
        this.current -= step;
    }
}
module.exports = Currency;