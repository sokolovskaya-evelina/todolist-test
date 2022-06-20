import React, {ChangeEvent} from 'react';
import styles from "./Search.module.scss";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import Icon from "../../common/Icon";

type ButtonType = {
    value: string
    icon: IconProp
    placeholder: string,
    setText: (e: string) => void
    onClick?: () => void
    onChange?: (text: string) => void
}

const Search: React.FC<ButtonType> = ({icon, placeholder, setText, onClick, value, onChange}) => {
    return (
        <div className={styles.styleInput}>
            <button className={styles.button} onClick={onClick}>
                <Icon icon={icon}/>
            </button>
            <input
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setText(e.target.value)
                    if (onChange) onChange(e.target.value)
                }}
                onBlur={() => {
                    if (onChange) {
                        onChange('')
                        setText('')
                    }
                }}
                className={styles.input}
                type="text"
                placeholder={placeholder}
            />
        </div>
    );
};

export default Search;
