/**
 * Created by LDQ on 2017/10/11
 */
import React, {Component} from 'react';

//  有策划操作的组件
class SlideOperateView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style:{
                marginLeft:0
            }
        };
    }

    touchStart(event){
        this.props.start.x = event.touches[0].clientX;
        console.log(this.props.start.x);
    }
    touchMove(event){
        let marginLeft = event.touches[0].clientX - this.props.start.x;
        if(marginLeft < 0){
            this.setState({
                style:{
                    marginLeft:marginLeft+"px"
                }
            });
        }

    }
    touchEnd(event){

    }
    render() {
        return (
            <div
                style={this.state.style}
                className={this.props.className}
                onTouchStart={this.touchStart.bind(this)}
                onTouchMove={this.touchMove.bind(this)}
                onTouchEnd={this.touchEnd.bind(this)}
            >
                {this.props.children}
            </div>
        );
    }

}
module.exports = SlideOperateView;