import React from 'react';
import styles from "./Button.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

type ButtonType = {
    icon: IconProp
    placeholder: string
}

const Button: React.FC<ButtonType> = ({icon, placeholder}) => {
    return (
        <div>
            <div className={styles.styleInput}>
                <input className={styles.input} type="text" placeholder={placeholder}/>
                <button className={styles.button} type="submit"><FontAwesomeIcon icon={icon}/></button>
            </div>
        </div>
    );
};

export default Button;
