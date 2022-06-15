import React, {useState} from 'react';
import {IconLookup} from "@fortawesome/fontawesome-svg-core";
import Button from "../../../common/Button";

const searchIcon: IconLookup = {prefix: 'fas', iconName: 'magnifying-glass'}

const SearchTagsInput = () => {
    const [text, setText] = useState<string>('')
    return (
        <div>
            <Button onClick={()=>{}} value={text} setText={setText} icon={searchIcon} placeholder="Поиск по задачам"/>
        </div>
    );
};

export default SearchTagsInput;
