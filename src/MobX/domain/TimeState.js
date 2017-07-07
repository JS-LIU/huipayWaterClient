/**
 * Created by LDQ on 2017/6/28.
 */

import {observable, computed, action} from "mobx";

class TimeState{
    @observable timer = 0;
    @action resetTimer(){
        this.timer = 0;
    }
    @action increase(){
        let self = this;
        setInterval((function tick() {
            self.timer += 1;
        }), 1000);
    }
}

module.exports = TimeState;

