import clsx from "clsx";
import styles from './Search.module.scss'
import Modal from 'react-bootstrap/Modal';
import { useRef, useState, memo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "~/hooks";

function Seacrh({className}) {
    const [show, setShow] = useState(false);
    const [textSearch,setTextSearch] = useState("")
    const labelSearch = useRef(null); 
    const inputSearch = useRef(null); 
    const handleBlur = function(e){
        const textInput = e.target.value
        if(textInput){
            labelSearch.current.classList.add(clsx(styles.labelSearchHasText));
        }else{
            labelSearch.current.classList.remove(clsx(styles.labelSearchHasText));
        }
    }
    const handleCloseModal = ()=>{
        setShow(false)
    }
    const handleOpenModal = ()=>{
        setShow(true)
    }
    const handleEnteredModal = ()=>{
        inputSearch.current.focus()
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
                className={clsx(styles.search,{
                    [className]: className
                })}
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
                        <input 
                            ref={inputSearch}
                            value={textSearch} 
                            id="search" 
                            className={clsx(styles.inputSearch)} 
                            type="text"
                            onChange={handleChangeInputSearch}
                            onBlur={handleBlur}
                        />
                        <label 
                            ref={labelSearch}
                            htmlFor="search" 
                            className={clsx(styles.labelSearch)} 
                        >
                            Search
                        </label>
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