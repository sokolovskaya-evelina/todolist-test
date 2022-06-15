import React from 'react';
import styles from './Filters.module.scss'
import AddTaskInput from "./components/AddTaskInput";
import TagsSelect from "./components/TagsSelect";
import SearchTagsInput from "./components/SearchTagsInput";

interface IFilters {

}

const Filters: React.FC<IFilters> = () => {
    return (
        <div className={styles.filtersContainer}>
            <AddTaskInput/>
            <TagsSelect/>
            <SearchTagsInput/>
        </div>
    );
};

export default Filters;
