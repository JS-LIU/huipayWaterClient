/**
 * Created by LDQ on 2017/9/5
 */
import {observable, computed,action} from "mobx";
class CountDown{
    constructor(init,end,step,initText){
        this.init = init;
        this.end = end;
        this.step = step;
        this.resetTimeText = function(str){
            this._time = str;
        };
        this.initText = initText;
        this.suffix = '秒后重试';
    }
    @observable _time = this.initText;

    @computed get time(){
        if(this._time !== this.initText){
           return this._time + this.suffix;
        }
        return this._time;
    }

    start(){
        let step = Math.abs(this.step * 1000);
        this._time = this.init;
        let timer = setInterval(()=>{
            this._time += this.step;
            if(this._time === this.end){
                clearInterval(timer);
                this.resetTimeText(this.initText);
            }
        },step);
    }


}
module.exports = CountDown;