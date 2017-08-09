/**
 * Created by LDQ on 2017/7/12.
 */
import React, {Component} from 'react';


class Button extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div
                style={this.props.style}
                className={this.props.className}
                onClick={this.props.onClick}
            >
                {this.props.children}
            </div>
        );
    }

}
module.exports = Button;