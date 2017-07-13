/**
 * Created by LDQ on 2017/7/12.
 */
import React, {Component} from 'react';
const Button = React.createClass({
    render: function () {
        return (
            <button style={this.props.style} onClick={this.props.onPress}>
                {this.props.title}
            </button>
        )
    }
});

module.exports = Button;