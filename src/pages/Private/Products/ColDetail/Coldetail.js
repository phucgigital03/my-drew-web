import clsx from "clsx";
import styles from './Coldetail.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faEye, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import { useState } from "react";

import Popper from "~/components/Popper";
import Modal from "~/components/Modal";
import FormUpdate from "../FormUpdate";

const URL_API = process.env.REACT_APP_URL_API
function ColDetail({ lengthThTag,dataRender }) {
    const [showOption,setShowOption] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const renderOption = props => {
        return (
            <div className="box" tabIndex="-1" {...props}>
               <div className={clsx(styles.option)}>
                    <Popper>
                        <ul className={clsx(styles.menuOption)}>
                            <li className={clsx(styles.itemOption)}>
                                <FontAwesomeIcon icon={faEye}/>
                                <span className={clsx(styles.textOption)}>Preview</span>
                            </li>
                            <li className={clsx(styles.itemOption)}>
                                <FontAwesomeIcon icon={faTrashCan}/>
                                <span className={clsx(styles.textOption)}>Delete</span>
                            </li>
                        </ul>
                    </Popper>
               </div>
            </div>
        )
    }
    const handleHidden = ()=>{
        setShowOption(false)
    }
    const handleToggle = ()=>{
        setShowOption(!showOption)
    }
    const handleShowModal = ()=>{
        setModalShow(true)
    }
    const handlehiddenModal = ()=>{
        setModalShow(false)
    }
    return ( 
        dataRender.length ? (
           dataRender.map((item,ind)=>{
            return (
                <tr key={ind}>
                    <th>
                        {ind + 1}
                    </th>
                    <th>
                        <div className={clsx(styles.wrapImg)}>
                            <img src={`${URL_API}/${item?.listImg?.[0]}`} alt="imgProduct"/>
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
                            <span onClick={handleShowModal} className={clsx(styles.actionUpdate)}>
                                <FontAwesomeIcon icon={faPen}/>
                            </span>
                            <Modal
                                show={modalShow}
                                onHide={handlehiddenModal}
                            >
                                <FormUpdate
                                    product={item}
                                />
                            </Modal>
                            <Tippy
                                placement="bottom-end"
                                interactive
                                visible={showOption}
                                onClickOutside={handleHidden}
                                render={renderOption}
                            >
                                <span onClick={handleToggle} className={clsx(styles.optionDeleAndPreview)}>
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