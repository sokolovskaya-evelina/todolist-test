import React from 'react';
import {IconLookup} from "@fortawesome/fontawesome-svg-core";
import Button from "../../../common/Button";

const searchIcon: IconLookup = {prefix: 'fas', iconName: 'magnifying-glass'}

const SearchTagsInput = () => {
    return (
        <div>
            <Button icon={searchIcon} placeholder="Поиск по задачам"/>
        </div>
    );
};

export default SearchTagsInput;
