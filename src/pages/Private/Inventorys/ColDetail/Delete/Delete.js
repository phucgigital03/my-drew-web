import clsx from "clsx";
import styles from './Delete.module.scss'
import { useContext,useState } from "react";

import Button from "~/components/Button";
import { useAxiosPrivate } from "~/hooks";
import { httpPrivate } from "~/utils/http";
import { deleSortInventory } from "~/services/inventorys";
import { InventoryContext } from "../../Inventorys";
import FeedbackError from "~/components/FeedbackError";

function Delete({ inventory,handleHidden }) {
    const {handleDeleInventory} = useContext(InventoryContext)
    const httpPrivates = useAxiosPrivate(httpPrivate)
    const [messageForm,setMessageForm] = useState(null);

    const handleDele = async ()=>{
        const resultApi = await deleSortInventory(httpPrivates,inventory._id);
        console.log(resultApi)
        if(resultApi.statusCode === 500){
            setMessageForm("error server")
        }else if(resultApi.statusCode === 400){
            setMessageForm(resultApi.errorMessage)
        }else if(resultApi.statusCode === 200){
            setMessageForm(resultApi.message)
            handleDeleInventory(inventory)
        }
    }
    return (
        <div className={clsx(styles.delete)}>
            <FeedbackError success={messageForm === 'delete success'}>
                {messageForm}
            </FeedbackError>
            <p className={clsx(styles.textDelete)}>
                Do you want to delete it ? 
                <span>{inventory.title}</span>
            </p>
            <div className={clsx(styles.blockDeleteBtn)}>
                <Button yellow onClick={handleHidden}>
                    Cancel
                </Button>
                <Button yellow onClick={handleDele}>
                    Delete
                </Button>
            </div>
        </div>
    );
}

export default Delete;