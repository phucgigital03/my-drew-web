import { useEffect, useState } from "react";

function useDebounce(value,delay) {
    const [valueResult,setValueResult] = useState(value);
    useEffect(()=>{
        const id = setTimeout(()=>{
            setValueResult(value)
        },delay);
        return ()=>{
            clearTimeout(id);
        }
    },[value,delay]);
    return valueResult;
}

export default useDebounce;