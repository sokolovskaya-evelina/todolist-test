import React from 'react';
import {IconLookup} from '@fortawesome/fontawesome-svg-core'
import Button from "../../../common/Button";

const plusIcon: IconLookup = {prefix: 'fas', iconName: 'plus'}

const AddTaskInput = () => {
    return (
        <div>
            <Button icon={plusIcon} placeholder="Введите название задачи"/>
        </div>
    );
};

export default AddTaskInput;
