import React, { Component } from 'react';
import CodeBox from './CodeBox';
import './ChangePolicy.css';
import ActionIcon from '../ActionIcon';

const CODE_PLACEHOLDER = ['', '', '', ''];

export default class ChangePolicy extends Component {

    constructor() {
        super();
        this.state = {
            code: CODE_PLACEHOLDER
        };
        this.change = this.change.bind(this);
    }

    change(e) {
        let { code } = this.state;
        code[e.target.getAttribute('data-index')] = e.target.value;
        this.setState({
            code
        });
    }

    render() {
        let codeBoxes = CODE_PLACEHOLDER.map((item, index) => {
            return <CodeBox 
                value={this.state.code[index]} 
                key={index} 
                change={this.change} 
            />
        });

        return (
            <div className="panel change-policy">
                <ActionIcon name="close" color="black" />
                <h4>Change Your Scan Profile</h4>
                <p>Enter the 4-digit profile code below</p>
                <div className="code-container" style={{width: CODE_PLACEHOLDER.length * 82 + "px"}}>
                    {codeBoxes}
                </div>
            </div>
        );
    }

}