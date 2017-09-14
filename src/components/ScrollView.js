/**
 * Created by LDQ on 2017/9/14
 */

import React, {Component} from 'react';


class ScrollView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let style = Object.assign({},this.props.style,{
            overflow:"auto"
        });
        return (
            <div
                style={style}
                className={this.props.className}
                onScrollCapture={this.props.onScrollCapture}
                id={this.props.id}
            >
                {this.props.children}
            </div>
        );
    }

}
module.exports = ScrollView;