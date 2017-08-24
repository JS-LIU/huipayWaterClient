/**
 * Created by LDQ on 2017-08-23
 */
import React, {Component} from 'react';

class Text extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <span style={this.props.style} className={this.props.className}>
                {this.props.children}
            </span>
        );
    }

}
module.exports = Text;
