import clsx from "clsx";
import styles from './Modal.module.scss';
import ModalUI from 'react-bootstrap/Modal';

function Modal({ textHeader,children, ...props }) {
    return ( 
        <ModalUI
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <ModalUI.Header closeButton>
                <ModalUI.Title id="contained-modal-title-vcenter">
                    <h1 className={clsx(styles.header)}>
                        {textHeader}
                    </h1>
                </ModalUI.Title>
            </ModalUI.Header>
            <ModalUI.Body>
                <div className={clsx(styles.contentModal)}>
                    {children}
                </div>
            </ModalUI.Body>
        </ModalUI>
    );
}

export default Modal;