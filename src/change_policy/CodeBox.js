import React from 'react';

export const CodeBox = (props) => {
    return (
        <div className="code-box">
            <input 
                data-index={props.key} 
                onChange={props.change} 
                type="text"
                value={props.value} 
            />
        </div>
    )
}

export default CodeBox;