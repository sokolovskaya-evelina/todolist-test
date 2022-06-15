import React, {ChangeEvent} from 'react';
import styles from "./Button.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

type ButtonType = {
    icon: IconProp
    placeholder: string,
    setText: (e: string) => void
    onClick: () => void
    value: string
}

const Button: React.FC<ButtonType> = ({icon, placeholder, setText, onClick, value}) => {
    return (
        <div>
            <div className={styles.styleInput}>
                <input value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)} className={styles.input}
                       type="text" placeholder={placeholder}/>
                <button className={styles.button} onClick={onClick}><FontAwesomeIcon icon={icon}/></button>
            </div>
        </div>
    );
};

export default Button;
