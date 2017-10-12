/**
 * Created by LDQ on 2017/10/11
 */
import React, {Component} from 'react';

//  有策划操作的组件
class SlideOperateView extends React.Component {
    constructor(props) {
        super(props);
        let style = Object.assign({},this.props.style,{
           marginLeft:0
        });

        this.state = {style};
    }

    touchStart(event){
        this.props.start.x = event.touches[0].clientX;
        let marginLeft = parseFloat(this.state.style.marginLeft);
        if( marginLeft === -75){
            let style =  Object.assign({},this.state.style,{
                marginLeft:"0px"
            });
            this.setState({style});
        }

    }
    touchMove(event){
        let marginLeft = event.touches[0].clientX - this.props.start.x;
        let style = Object.assign({},this.state.style,{
            marginLeft:marginLeft+"px"
        });
        if(marginLeft < 0){
            this.setState({style});
        }

    }
    touchEnd(event){
        let marginLeft = parseFloat(this.state.style.marginLeft);
        if(marginLeft < -30){
            marginLeft = -75
        }else{
            marginLeft = 0;
        }
        let style = Object.assign({},this.state.style,{
            marginLeft:marginLeft+"px"
        });
        this.setState({style});
    }
    render() {
        return (
            <div
                style={this.state.style}
                className={this.props.className}
                onTouchStart={this.touchStart.bind(this)}
                onTouchMove={this.touchMove.bind(this)}
                onTouchEnd={this.touchEnd.bind(this)}>
                {this.props.children}
            </div>
        );
    }

}
module.exports = SlideOperateView;