import React, {useState} from 'react';
import styles from "./Tasks.module.scss";
import Tag from "../Tag/Tag";
import Modal from "../../common/Modal/Modal";
import {$store, deleteTask, storeType, updateTask} from "../../stateManagement/effector";
import TaskEditorModal from "../../common/TaskEditorModal/TaskEditorModal";
import {IconLookup} from "@fortawesome/fontawesome-svg-core";
import {useStore} from "effector-react";
import {TaskType} from "../../common/types";
import Icon from "../../common/Icon";

const trashIcon: IconLookup = {prefix: 'fas', iconName: 'trash'}

interface ITask {
    task: TaskType
}

const Task:React.FC<ITask> = ({task}) => {
    const tasks = useStore<storeType>($store).filteredTasks
    const tags = useStore<storeType>($store).tags;

    const [isOpenModal, setOpenModal] = useState(false);
    const [isOpenEditorModal, setIsOpenEditorModal] = useState(false)
    return (
        <div
            key={task.id}
            onDoubleClick={()=>setIsOpenEditorModal(true)}
            className={styles.taskCard}
            style={{width: tasks.length === 1 ? '500px' : '100%'}}>
            {task.text}
            <div className={styles.taskTags}>
                {task.tagIds.map((id: string) => <Tag key={id} tag={tags[id]}/>)}
            </div>
            <div className={styles.taskSettings} onClick={() => setOpenModal(true)}>
                <Icon icon={trashIcon}/>
            </div>
            {isOpenModal && <Modal isOpenModal={isOpenModal} setOpenModal={setOpenModal}>
                <div className={styles.modalContainer}>
                    Вы действительно хотите удалить задачу?
                    <div className={styles.buttonContainer}>
                        <button className={`${styles.btn} ${styles.yes}`} onClick={() => {
                            deleteTask(task.id)
                            setOpenModal(false)
                        }}>Да
                        </button>
                        <button className={`${styles.btn} ${styles.no}`}
                                onClick={() => setOpenModal(false)}>Нет
                        </button>
                    </div>
                </div>
            </Modal>}
            {isOpenEditorModal && <TaskEditorModal
                title="Редактор задачи"
                isOpenModal={isOpenEditorModal}
                setIsOpenModal={setIsOpenEditorModal}
                task={task}
                onSave={(task) => {
                    updateTask(task)
                    setIsOpenEditorModal(false)
                }}
            />}
        </div>
    );
};

export default Task;
