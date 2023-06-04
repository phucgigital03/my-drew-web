import clsx from "clsx";
import styles from "./FormGroupSelect.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import { useState } from "react";
import Popper from "~/components/Popper";

const fakeDistricts = [
    {
        id: 0,
        name: "------"
    },
    {
        id: 1,
        name: "Ha noi"
    },
    {
        id: 2,
        name: "TP Ho Chi Minh"
    },
    {
        id: 3,
        name: "Ninh Thuan"
    },
    {
        id: 4,
        name: "Binh Thuan"
    },
    {
        id: 5,
        name: "TP Nha Trang"
    },
    {
        id: 6,
        name: "Da nang"
    },
    {
        id: 7,
        name: "TP Vung Tau"
    },
]
function FormGroupSelect({idSelect,nameSelect,valueSelectStage = "",labelText,handleChange}) {
    const [show,setShow] = useState(false);
    const handleShow = ()=>{
        setShow(!show);
    }
    const handleHidden = ()=>{
        setShow(false)
    }
    const handleMouseOut = (e)=>{
        const id = Number(e.target.id)
        const eleLi = e.target;
        if(id === 0){
            eleLi.classList.add(clsx(styles.itemHoldActive))
        }else{
            eleLi.classList.remove(clsx(styles.itemHoldActive))
        }
    }
    const renderTippy = (props)=>{
        return (
            <div className="box" tabIndex="-1" {...props}>
                <Popper>
                <div className={clsx(styles.contentMenu)}>
                        <div className={clsx(styles.headerMenu)}>
                            <input className={clsx(styles.inputSearch)} type="text"/>
                        </div>
                        <div className={clsx(styles.sectionMenu)}>
                            <ul className={clsx(styles.menu)}>
                            {
                                fakeDistricts.map((fakeDistrict)=>{
                                    return (
                                        <li 
                                            id={fakeDistrict.id}
                                            key={fakeDistrict.id} 
                                            className={clsx(styles.itemMenu,{
                                                [styles.itemActive]: (0 === fakeDistrict.id)
                                            })}
                                            onMouseOut={handleMouseOut}
                                        > 
                                            {fakeDistrict.name}
                                        </li>
                                    )
                                })
                            }
                            </ul>
                        </div>
                </div>
                </Popper>
            </div>
        )
    }
    return (
        <div>
            {/* add div fix tippy */}
            <Tippy
                offset={[0,4]}
                interactive
                visible={show}
                placement="bottom"
                render={renderTippy}
                onClickOutside={handleHidden}
            >
                <div className={clsx(styles.wrapSelect)}>
                    <label htmlFor={idSelect} className={clsx(styles.labelSelect)}>
                        {labelText}
                    </label>
                    <select onClick={handleShow} onChange={()=>{}} value={valueSelectStage} id={idSelect} name={nameSelect} className={clsx(styles.tagSelect)} tabIndex={-1}>
                    </select>
                    <label htmlFor={idSelect}>
                        <span className={clsx(styles.textSelect)}>
                            -----
                        </span>
                    </label>
                    <label htmlFor={idSelect} className={clsx(styles.iconSelect)}>
                        <span>
                            <FontAwesomeIcon icon={faSortDown}/>
                        </span>
                    </label>
                </div>
            </Tippy>
        </div>
    );
}

export default FormGroupSelect;