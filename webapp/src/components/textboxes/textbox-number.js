import React from 'react';

// validazione caratteri per textbox "particolari" (numerici)

const TextBoxNumber = (props) => {

    const getKeyCode = (e) => {
        if (window.event)
            return window.event.keyCode;
        else if (e)
            return e.which;
        else
            return null;
    };

    const keyRestrict = (event) => {
        const validchars = '0123456789';
        let key = 0;
        let keychar = '';
        let validchar = '';
    
        key = getKeyCode(event);

        if (key === null) return;
        
        keychar = String.fromCharCode(key);
        keychar = keychar.toLowerCase();
        validchar = validchars.toLowerCase();        
        if (validchar.indexOf(keychar) !== -1)
            return;
        if (key === null || key === 0 || key === 8 || key === 9 || key === 13 || key === 27)
            return;


        event.preventDefault();
        event.stopPropagation();
    }

    return (
        <input 
            type="text" 
            className="form-control input-sm text-box-number cleanInput" 
            placeholder={props.placeholder} 
            maxLength={props.maxlength}
            onKeyDown={keyRestrict}
        />
    );

};

export default TextBoxNumber;