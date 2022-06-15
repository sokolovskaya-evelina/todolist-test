import React, {useState} from 'react';
import styles from "../Filters.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    IconLookup
} from '@fortawesome/fontawesome-svg-core'

const downIcon: IconLookup = {prefix: 'fas', iconName: 'chevron-down'}
const upIcon: IconLookup = {prefix: 'fas', iconName: 'chevron-up'}
const plusIcon: IconLookup = {prefix: 'fas', iconName: 'plus'}


const TagsSelect = () => {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <div className={styles.styleInput}>
                <input className={styles.input} type="text" placeholder="Введите название тега" onClick={() => setOpen(!open)}/>
                <button className={styles.button}><FontAwesomeIcon icon={plusIcon}/></button>
                <button onClick={() => setOpen(!open)} className={styles.button}><FontAwesomeIcon
                    icon={open ? upIcon : downIcon}/>
                </button>
                {open && (
                    <ul className={styles.tagsList}>
                        <li>Alabama</li>
                        <li>Alaska</li>
                        <li>Arizona</li>
                        <li>Arkansas</li>
                        <li>California</li>
                        <li>Colorado</li>
                        <li>Connecticut</li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TagsSelect;
