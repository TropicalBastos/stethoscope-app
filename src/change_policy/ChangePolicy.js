import React, { Component } from 'react';
import CodeBox from './CodeBox';
import './ChangePolicy.css';
import ActionIcon from '../ActionIcon';
import CustomPolicy from '../lib/CustomPolicy';
import axios from 'axios';

let fs = window.require('fs');
let yaml = window.require('js-yaml');
let remote = window.require('electron').remote;
let path = window.require('path');
let dialog = remote.dialog;

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
        this.resetPolicyDefaults = this.resetPolicyDefaults.bind(this);
        this.changePolicy = this.changePolicy.bind(this);
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

    resetPolicyDefaults() {
        dialog.showMessageBox(remote.getCurrentWindow(), {
            message: 'Are you sure you wish to reset your current policy configuration to the system default?',
            buttons: ['Yes', 'No']
        }, (response) => {
            if(response === 0) {
                let customPolicy = new CustomPolicy();
                customPolicy.deletePolicy();
                dialog.showMessageBox(remote.getCurrentWindow(), {
                    message: 'Your policy configuration has been reset'
                }, () => {
                    this.hide();
                });
            }
        });
    }

    changePolicy() {
        let code = parseInt(this.state.code.join(''));
        dialog.showMessageBox(remote.getCurrentWindow(), {
            message: `Are you sure you wish to change the current policy configuration with the one from the code ${code}`,
            buttons: ['Yes', 'No']
        }, async (response) => {
            if(response === 0) {
                let apiHandle = fs.readFileSync(path.join(remote.app.getAppPath(), '/practices/api.yaml'), 'utf8');
                let apiConfig = yaml.safeLoad(apiHandle);
                let url = apiConfig.policyChangeRequest;
                try {
                    let result = await axios.post(url, { code });
                    let json = yaml.safeLoad(result.data);
                    let customPolicy = new CustomPolicy();
                    customPolicy.setPolicy(json);
                    dialog.showMessageBox(remote.getCurrentWindow(), {
                        message: 'Current policy overwritten'
                    });
                    this.hide();
                } catch(e) {
                    dialog.showMessageBox(remote.getCurrentWindow(), {
                        message: `Could not fetch policy with code ${code}`
                    });
                }
            }
        });
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
                    <button onClick={this.resetPolicyDefaults} className="btn btn-default float-left">
                        {strings.resetPolicyDefaults}
                    </button>
                    <button onClick={this.changePolicy} className="btn btn-default pull-right">
                        {strings.changePolicyButton}
                    </button>
                </div>
            </div>
        );
    }

}