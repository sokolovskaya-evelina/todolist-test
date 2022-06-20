import React, {KeyboardEvent, useEffect, useState} from 'react';
import styles from "./Tags.module.scss";
import Tag from "../Tag/Tag";
import {$store, addTag, deleteTag, filterTasksByTagId, storeType, updateTagIds} from "../../stateManagement/effector";
import {useStore} from "effector-react";
import {v1} from "uuid";
import {ALL, WITHOUT_TAGS} from "../../common/constants";

const Tags = () => {
    const tags = useStore<storeType>($store).tags;
    const selectedTagsIds = useStore<storeType>($store).selectedTagsIds;
    const [tagName, setTagName] = useState('');

    const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' && !!tagName) {
            addTag({id: v1(), name: tagName})
            setTagName('')
        }
    }

    const onFilterTasksByTagId = (tagId: string) => {
        updateTagIds(tagId)
        filterTasksByTagId(tagId)
    }

    return (
        <>
            <input
                placeholder="Добавить новый тег"
                className={styles.addTagBtn}
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                onKeyPress={onEnterPress}/>
            <Tag onClick={onFilterTasksByTagId} selected={selectedTagsIds.includes(ALL)} key={ALL} tag={{id: ALL, name: 'Все', color: '#BBE1FA'}}/>
            <Tag onClick={onFilterTasksByTagId}  selected={selectedTagsIds.includes(WITHOUT_TAGS)} key={WITHOUT_TAGS} tag={{id: WITHOUT_TAGS, name: 'Без тегов', color: '#BBE1FA'}}/>
            {Object.values(tags).map(tag => <Tag selected={selectedTagsIds.includes(tag.id)} onClick={onFilterTasksByTagId} key={tag.id} tag={tag}
                                                 onDeleteTag={tagId => deleteTag(tagId)}/>)}
        </>
    );
};

export default Tags;
