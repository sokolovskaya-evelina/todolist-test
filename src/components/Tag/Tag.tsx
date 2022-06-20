import React from 'react';
import styles from "./Tag.module.scss";
import {TagType} from "../../common/types";
import {IconLookup} from "@fortawesome/fontawesome-svg-core";
import Icon from "../../common/Icon";

const exitIcon: IconLookup = {prefix: 'fas', iconName: 'xmark'}

interface ITag {
    tag: TagType
    onDeleteTag?: (tagId: string) => void
    onClick?: (tagId: string) => void
    selected?: boolean
}

const Tag: React.FC<ITag> = ({tag, onDeleteTag, onClick, selected}) => {
    return (
        <div
            onClick={() => {
                if (onClick) onClick(tag.id)
            }}
            className={styles.tag}
            style={{
                background: tag?.color,
                boxShadow: selected ? '0px 6px 10px 4px rgba(187, 225, 250, 0.15), 0px 2px 3px rgba(187, 225, 250, 0.3)' : 'none'
            }}
        >
            {tag?.name}
            {tag?.id && onDeleteTag &&
                <div onClick={e => {
                    e.stopPropagation()
                    onDeleteTag(tag.id)
                }}>
                    <Icon style={{marginLeft: '5px'}} icon={exitIcon}/>
                </div>}
        </div>
    );
};

export default React.memo(Tag);
