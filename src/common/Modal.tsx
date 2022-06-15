import React, {Dispatch, SetStateAction} from 'react';
import styles from './Modal.module.scss'

interface IModal {
    isOpenModal: boolean
    setOpenModal: Dispatch<SetStateAction<boolean>>
    children: React.ReactNode
}

const Modal: React.FC<IModal> = ({setOpenModal, isOpenModal, children}) => {
    return (
        <div className={isOpenModal ? `${styles.modal} ${styles.active}` : styles.modal} onClick={()=> setOpenModal(false)}>
            <div onClick={e=> e.stopPropagation()}
                 className={isOpenModal ? `${styles.modalContent} ${styles.active}` : styles.modalContent}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
