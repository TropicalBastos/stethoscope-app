import React, { Component } from 'react';
import CodeBox from './CodeBox';
import './ChangePolicy.css';
import ActionIcon from '../ActionIcon';

const CODE_PLACEHOLDER = ['', '', '', ''];

export default class ChangePolicy extends Component {

    constructor() {
        super();
        this.state = {
            code: CODE_PLACEHOLDER,
            focusedIndex: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(e) {
        let el = e.target;
        let index = el.getAttribute('data-index');
        let focusedIndex = parseInt(index);
        if(e.keyCode != 8 && el.value.length === 1) {
            focusedIndex = focusedIndex + 1;
        } else if(e.keyCode === 8 && el.value.length === 0) {
            focusedIndex = focusedIndex - 1;
        }
        this.setState({
            focusedIndex
        });
    }

    handleChange(e) {
        let { code } = this.state;
        let el = e.target;
        let index = el.getAttribute('data-index');
        if(el.value.length > 1) {
            return;
        }
        code[index] = el.value;
        this.setState({
            code
        });
    }

    hide() {
        this.ref.classList.add('fadeOut');
        setTimeout(() => {
            this.props.toggleChangeProfile(false);
        }, 500);
    }

    render() {
        let codeBoxes = CODE_PLACEHOLDER.map((item, index) => {
            return <CodeBox 
                value={this.state.code[index]} 
                key={index}
                index={index} 
                handleKeyDown={this.handleKeyDown}
                handleChange={this.handleChange}
                focusedIndex={this.state.focusedIndex}
            />
        });

        let { strings } = this.props;

        return (
            <div ref={r => this.ref = r} className="panel change-policy">
                <ActionIcon onClick={this.hide.bind(this)} name="close" color="black" />
                <h4>{strings.changeScanProfile}</h4>
                <p>{strings.enterDigits}</p>
                <div className="code-container" style={{width: CODE_PLACEHOLDER.length * 82 + "px"}}>
                    {codeBoxes}
                </div>
                <div class="clearfix"></div>
                <div class="change-policy-footer">
                    <button className="btn btn-default float-left">
                        {strings.resetPolicyDefaults}
                    </button>
                    <button className="btn btn-default pull-right">
                        {strings.changePolicyButton}
                    </button>
                </div>
            </div>
        );
    }

}