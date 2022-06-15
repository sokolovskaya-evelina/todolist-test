import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {TaskType} from "../../App";
import styles from './Tasks.module.scss'
import {IconLookup} from "@fortawesome/fontawesome-svg-core";
import {deleteTask, updateTaskText} from "../../stateManagement/effector";
import Modal from "../../common/Modal";


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
    const [isOpenModal, setOpenModal] = useState(false)
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
                <FontAwesomeIcon icon={trashIcon} color="#FF5151" className={styles.icon} onClick={() => setOpenModal(true)}/>
                <Modal isOpenModal={isOpenModal} setOpenModal={setOpenModal}>
                    <div className={styles.modalContainer}>
                        Вы действительно хотите удалить задачу?
                        <div className={styles.buttonContainer}>
                            <button className={`${styles.btn} ${styles.yes}`} onClick={() => {
                                deleteTask(task.id)
                                setOpenModal(false)
                            }}>Да</button>
                            <button className={`${styles.btn} ${styles.no}`} onClick={() => setOpenModal(false)}>Нет</button>
                        </div>
                    </div>
                </Modal>
            </div>

        </div>
    );
};

export default Task;
