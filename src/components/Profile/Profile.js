import clsx from "clsx";
import styles from './Profile.module.scss'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { useState,useEffect,useCallback } from "react";

import { useAxiosPrivate,useLogOut } from "~/hooks";
import { getInfoUser } from "~/services/infoUser";
import { useNavigate } from "react-router-dom";
import configs from "~/configs";
import { httpPrivate } from "~/utils/http";
import Table from '~/components/Table';
import ColDetail from "./ColDetail";

const listTitle = [
    'STT',
    'Đơn hàng',
    'Ngày',
    'Chuyển đến',
    'Địa chỉ',
    'Giá trị đơn hàng',
    'Tình trạng thanh toán'
]

function Profile() {
    const accessToken = useSelector(state => state.user.accessToken)
    const [orders,setOrders] = useState([]);
    const [email,setEmail] = useState('');
    const httpPrivates = useAxiosPrivate(httpPrivate);
    const navigate = useNavigate();
    const logout = useLogOut();
    const decodeJWT = jwtDecode(accessToken)
    const userId = decodeJWT?.userInfo?.id;

    useEffect(()=>{
        const controller = new AbortController();
        const getListOrder = async ()=>{
            const result = await getInfoUser(httpPrivates,userId,'order',controller);
            if(result.statusCode === 403 || result.statusCode === 500){
                setOrders([]);
                setEmail('');
                await logout()
                navigate(configs.routes.login,{ replace: true})
            }
            if(result.statusCode === 200){
                console.log(result.orders)
                setOrders(result.orders);
                setEmail(result.email);
            }
        }
        getListOrder();
        return ()=>{
            controller.abort();
        }
    },[userId])

    const handleLogOut = useCallback(async (e)=>{
        e.preventDefault();
        await logout()
        navigate(configs.routes.login,{ replace: true });
    }, []);
    
    return (
        <div className={clsx(styles.userPage)}>
            <section className={clsx(styles.account)}>
                <h2 className={clsx(styles.titleAccount)}>
                    Account
                </h2>
                <Link onClick={handleLogOut} to={'/'}>
                    <FontAwesomeIcon icon={faUser}/>
                    Log out
                </Link>
            </section>
            <section className={clsx(styles.order)}>
                <h2 className={clsx(styles.titleOrder)}>
                    Order history
                </h2>
                <div className={clsx(styles.menuOrder)}>
                    <Table
                        listTitle={listTitle}
                    >
                        <ColDetail
                            dataRender={orders}
                            lengthThTag={listTitle.length}
                        />
                    </Table>
                </div> 
            </section>
            <section className={clsx(styles.accountDetails)}>
                 <h2 className={clsx(styles.titleAccountDetails)}>
                    Account details
                </h2>
                <p className={clsx(styles.nameAccount)}>{email}</p>
                <p className={clsx(styles.countyAccount)}>United States</p>
                <Link to={'/'}>View addresses</Link>
            </section>
        </div>
    );
}

export default Profile;
