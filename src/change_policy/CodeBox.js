import React, { Component } from 'react';

export default class CodeBox extends Component {
    
    componentDidUpdate() {
        if(this.props.focusedIndex === this.props.index) {
            this.ref.focus();
        }
    }

    render(){
        return (
            <div className="code-box">
                <input
                    ref={r => this.ref = r}
                    data-index={this.props.index} 
                    onKeyDown={this.props.handleKeyDown} 
                    onChange={this.props.handleChange}
                    type="text"
                    value={this.props.value}
                />
            </div>
        );
    }
}