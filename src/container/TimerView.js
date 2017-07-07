/**
 * Created by LDQ on 2017/6/28.
 */
import React, {Component} from 'react';
import {observer,inject} from 'mobx-react';

@inject (['timeState'])

@observer
class TimerView extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
    }
    componentDidMount(){
        this.props.timeState.increase();
    }
    render() {
        return (<button onClick={this.onReset.bind(this)}>
            Seconds passed: {this.props.timeState.timer}
        </button>);
    }

    onReset () {
        this.props.timeState.resetTimer();
    }
}
module.exports = TimerView;