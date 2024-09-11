import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

export default function Button({ className, text, onClick }) {
    const handleClick = () => {
        console.log("Button.jsx:6 handleClick()");
        onClick();
    };

    return (
        <button className={`${styles.Button} ${className}`} onClick={handleClick}>
            {text}
        </button>
    );
}

Button.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};
