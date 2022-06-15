import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {TaskType} from "../../App";
import styles from './Tasks.module.scss'
import {IconLookup} from "@fortawesome/fontawesome-svg-core";
import {updateTaskText} from "../../stateManagement/effector";


interface ITask {
    task: TaskType
}

const trashIcon: IconLookup = {prefix: 'fas', iconName: 'trash'}
const penIcon: IconLookup = {prefix: 'fas', iconName: 'pen'}
const checkIcon: IconLookup = {prefix: 'fas', iconName: 'check'}
const exitIcon: IconLookup = {prefix: 'fas', iconName: 'x'}
const tagIcon: IconLookup = {prefix: 'fas', iconName: 'tag'}


const Task: React.FC<ITask> = ({task}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState<string>(task.text)

    return (
        <div className={styles.taskCard}>
            {isEditing
                ? <input
                    autoFocus={true}
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                : task.text}
            <div>
                {isEditing ? (<>
                    <FontAwesomeIcon icon={exitIcon} color="#FF5151" onClick={() => {
                        setText(task.text)
                        setIsEditing(false)
                    }}/>
                    <FontAwesomeIcon className={styles.icon} icon={checkIcon} onClick={() => {
                        if (task.text !== text) {
                            updateTaskText({...task, text})
                        }
                        setIsEditing(false)
                    }}/>
                </>) : <FontAwesomeIcon icon={penIcon} onClick={() => {
                    setIsEditing(true)
                }}/>}
                <FontAwesomeIcon icon={tagIcon} className={styles.icon}/>
                <FontAwesomeIcon icon={trashIcon} color="#FF5151" className={styles.icon}/>
            </div>

        </div>
    );
};

export default Task;
