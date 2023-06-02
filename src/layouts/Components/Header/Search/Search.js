import clsx from "clsx";
import styles from './Search.module.scss'
import Modal from 'react-bootstrap/Modal';
import { useRef, useState, memo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useDebounce } from "~/hooks";
import FormGroup from "~/components/FormGroup";

function Seacrh() {
    const [show, setShow] = useState(false);
    const [textSearch,setTextSearch] = useState("")
    const inputSearch = useRef(null); 
    
    const handleCloseModal = ()=>{
        setShow(false)
    }
    const handleOpenModal = ()=>{
        setShow(true)
    }
    const handleEnteredModal = ()=>{
        inputSearch.current.focusSearch()
    }
    const handleChangeInputSearch = (e)=>{
        const textInput = e.target.value
        if(!textInput.startsWith(' ')){
            setTextSearch(textInput)
        }
    }
    const textSearchResult = useDebounce(textSearch,2000);
    useEffect(()=>{
        if(!textSearchResult){
            console.log('nothing');
            return ;
        }
        console.log(textSearchResult)
        // call Api search
    },[textSearchResult])
    return (
        <>
            <div 
                className={clsx(styles.search)}
                onClick={handleOpenModal}
            >
                <span>search</span>
            </div>
            <Modal
                show={show}
                className={clsx(styles.searchModal)}
                onEntered={handleEnteredModal}
                onHide={handleCloseModal}
            > 
                <div className={clsx(styles.wrapModalHeader)}>
                    <div className={clsx(styles.searchHeader)}>
                        <FormGroup 
                            ref={inputSearch}
                            valueInput={textSearch}
                            labelText={"Search"} 
                            handleChange={handleChangeInputSearch}
                        />
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </div>
                    <div className={clsx(styles.wrapBtn)}>
                        <button onClick={handleCloseModal} className={clsx(styles.modalCloseBtn)}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </button>
                    </div>
                </div>
            </Modal>
        </>
     );
}

export default memo(Seacrh);