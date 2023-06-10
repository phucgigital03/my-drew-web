import clsx from "clsx";
import styles from './Search.module.scss'
import Modal from 'react-bootstrap/Modal';
import { useState, memo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Form,Formik,FastField } from "formik";

import { useDebounce } from "~/hooks";
import FormGroup from "~/components/FormGroup";
import Button from "~/components/Button";

function Seacrh() {
    const [show, setShow] = useState(false);
    const [textSearch,setTextSearch] = useState('');
    const handleCloseModal = ()=>{
        setShow(false)
    }
    const handleOpenModal = ()=>{
        setShow(true)
    } 
    const textSearchResult = useDebounce(textSearch,2000);
    useEffect(()=>{
        if(!textSearchResult){
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
                onHide={handleCloseModal}
            > 
                <div className={clsx(styles.wrapModalHeader)}>
                    <div className={clsx(styles.searchHeader)}>
                    <Formik
                        initialValues={{
                            search: '',
                        }}
                        onSubmit={(values, actions) => {
                            console.log(values)
                        }}
                    >
                    {
                        (formikProps)=>{
                            const {values,errors,touched,handleSubmit,setFieldValue} = formikProps
                            // console.log(values,errors,touched)
                            const handleChange = (e)=>{
                                const textInput = e.target.value
                                if(!textInput.startsWith(' ')){
                                    setFieldValue('search',textInput);
                                    setTextSearch(textInput);
                                }
                            }
                            return (
                                <Form onSubmit={handleSubmit}>
                                    <FastField
                                        handleChange={handleChange}
                                        type={"text"}
                                        name={"search"}
                                        component={FormGroup}
                                        label={"Search"}
                                    />
                                    <Button type={"submit"} classBtn={clsx(styles.searchBtn)}>
                                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                                    </Button>
                                </Form>
                            )
                        }
                    }
                    </Formik>
                    </div>
                    <div className={clsx(styles.wrapBtn)}>
                        <Button onClick={handleCloseModal} classBtn={clsx(styles.modalCloseBtn)}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
     );
}

export default memo(Seacrh);