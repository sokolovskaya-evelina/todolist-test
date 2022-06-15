import React, {useState} from 'react';
import {addTask} from "../../../stateManagement/effector";
import {IconLookup} from '@fortawesome/fontawesome-svg-core'
import Button from "../../../common/Button";
import {v1} from "uuid";

const plusIcon: IconLookup = {prefix: 'fas', iconName: 'plus'}

interface IAddTask {
}

const AddTaskInput: React.FC<IAddTask> = () => {
    const [text, setText] = useState<string>('')

    return (
        <div>
            <Button value={text}
                    onClick={() => {
                        if (text !== '') {
                            addTask({id: v1(), text, tags: []})
                            setText('')
                        }
                    }}
                    setText={setText} icon={plusIcon} placeholder="Введите название задачи"/>
        </div>
    );
};

export default AddTaskInput;
