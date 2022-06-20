import React, {ChangeEvent, useState} from 'react';
import {IconLookup} from "@fortawesome/fontawesome-svg-core";
import styles from "./SearchByTagInput.module.scss";
import {searchByTagName} from "../../stateManagement/effector";
import Icon from "../../common/Icon";

const searchIcon: IconLookup = {prefix: 'fas', iconName: 'magnifying-glass'}

const SearchByTagsInput = () => {
    const [text, setText] = useState<string>('')
    return (
        <div>
            <div className={styles.styleInput}>
                <input value={text} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    searchByTagName(e.target.value)
                    setText(e.target.value)
                }}
                       className={styles.input}
                       type="text" placeholder="Поиск по тегам"/>
                <button className={styles.button}><Icon icon={searchIcon}/></button>
            </div>
        </div>
    );
};

export default SearchByTagsInput;
