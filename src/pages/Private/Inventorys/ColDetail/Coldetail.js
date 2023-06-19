import clsx from "clsx";
import styles from './Coldetail.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import { useState } from "react";

import Popper from "~/components/Popper";
import Modal from "~/components/Modal";
import FormUpdate from "./FormUpdate";
import Preview from "./Preview";
import Delete from "./Delete";

const URL_API = process.env.REACT_APP_URL_API
function ColDetail({ lengthThTag,dataRender }) {
    const [inventory,setInventory] = useState({});
    const [indexUpdate, setIndexUpdate] = useState(null);
    const [indexOption,setIndexOption] = useState(null);
    const [indexPreview,setIndexPreview] = useState(null);
    const [indexDele,setIndexDele] = useState(null);

    const renderOption = (item,index) => {
        return (props) => (
        <div className="box" tabIndex="-1" {...props}>
           <div className={clsx(styles.option)}>
                <Popper>
                    <ul className={clsx(styles.menuOption)}>
                        <Modal
                            textHeader={"preview inventory"}
                            show={indexPreview === index}
                            onHide={handleHiddenModalPreview}
                        >
                            <Preview 
                                inventory={inventory}
                            />
                        </Modal>
                        <li 
                            className={clsx(styles.itemOption)}
                            onClick={(e)=>{
                                handleShowModalPreview(item,index)
                            }} 
                        >
                            <FontAwesomeIcon icon={faEye}/>
                            <span className={clsx(styles.textOption)}>Preview</span>
                        </li>
                        <Modal
                            textHeader={"delete inventory"}
                            show={indexDele === index}
                            onHide={handleHiddenModalDele}
                        >
                            <Delete
                                inventory={inventory}
                                handleHidden={handleHiddenModalDele}
                            />
                        </Modal>
                        <li 
                            className={clsx(styles.itemOption)}
                            onClick={(e)=>{
                                handleShowModalDele(item,index)
                            }}
                        >
                            <FontAwesomeIcon icon={faTrashCan}/>
                            <span className={clsx(styles.textOption)}>Delete</span>
                        </li>
                    </ul>
                </Popper>
           </div>
        </div>
    )}
    const handleShowOption = (index)=>{
        setIndexOption(index)
    }
    const handleHiddenOption = ()=>{
        setIndexOption(null)
    }
    const handleShowModalUpdate = (item,index)=>{
        setIndexUpdate(index)
        setInventory(item)
    }
    const handlehiddenModalUpdate = ()=>{
        setIndexUpdate(null)
    }
    const handleShowModalPreview = (item,index)=>{
        setIndexPreview(index)
        setInventory(item)
        setIndexOption(null)
    }
    const handleHiddenModalPreview = ()=>{
        setIndexPreview(null)
    }
    const handleShowModalDele = (item,index)=>{
        setIndexDele(index)
        setInventory(item)
        setIndexOption(null)
    }
    const handleHiddenModalDele = ()=>{
        setIndexDele(null)
    }
    return ( 
        dataRender.length ? (
           dataRender.map((item,index)=>{
            return (
                <tr key={index}>
                    <th>
                        {index + 1}
                    </th>
                    <th>
                        <div className={clsx(styles.wrapImg)}>
                            <img src={`${URL_API}/${item?.listImg?.[0]}`} alt="imgInventory"/>
                        </div>
                    </th>
                    <th>
                        {item?.title}
                    </th>
                    <th>
                        {item?.category}
                    </th>
                    <th>
                        {item?.price}
                    </th>
                    <th>
                        {item?.discount}
                    </th>
                    <th>
                        {item?.quatity}
                    </th>
                    <th>
                        <div className={clsx(styles.action)}>
                            <Modal
                                textHeader={"update inventory"}
                                show={indexUpdate === index}
                                onHide={handlehiddenModalUpdate}
                            >
                                <FormUpdate
                                    inventory={inventory}
                                />
                            </Modal>
                            <span 
                                onClick={()=>{
                                    handleShowModalUpdate(item,index)
                                }} 
                                className={clsx(styles.actionUpdate)}
                            >
                                <FontAwesomeIcon icon={faPen}/>
                            </span>
                            <Tippy
                                placement="bottom-end"
                                interactive
                                visible={indexOption === index}
                                onClickOutside={handleHiddenOption}
                                render={renderOption(item,index)}
                            >
                                <span 
                                    onClick={()=>{
                                        handleShowOption(index)
                                    }} 
                                    className={clsx(styles.optionDeleAndPreview)}
                                >
                                    <FontAwesomeIcon icon={faEllipsisVertical}/>
                                </span>
                            </Tippy>
                        </div>
                    </th>
                </tr>
            )})
        ) : (
            <tr>
                <th colSpan={lengthThTag}>
                    <p className={clsx(styles.textOrder)}>You haven't placed any orders yet.</p>
                </th>
            </tr>
        )
)}

export default ColDetail;