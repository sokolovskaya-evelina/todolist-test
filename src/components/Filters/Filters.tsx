import React from 'react';
import styles from './Filters.module.scss'
import AddTaskInput from "./components/AddTaskInput";
import TagsSelect from "./components/TagsSelect";
import SearctTagsInput from "./components/SearchTagsInput";

const Filters = () => {
    return (
        <div className={styles.filtersContainer}>
            <AddTaskInput/>
            <TagsSelect/>
            <SearctTagsInput/>
        </div>
    );
};

export default Filters;
