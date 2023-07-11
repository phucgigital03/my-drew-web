import { memo } from "react";

function ColDetail({ lengthThTag,dataRender }) {
    return ( 
        dataRender.length ? (
            dataRender.map((item,ind)=>{
                return (
                    <tr key={ind}>
                        <th>{ind}</th>
                        <th>{item?._id}</th>
                        <th>{item?.createdAt}</th>
                        <th>{item?.shipping?.noteaddress}</th>
                        <th>{item?.shipping?.province}</th>
                        <th>{item?.total}</th>
                        <th>{item?.status}</th>
                    </tr>
                )
            })
        ) : (
            <tr>
                <th colSpan={lengthThTag}>
                    <p >You haven't placed any orders yet.</p>
                </th>
            </tr>
        )
    );
}

export default memo(ColDetail);