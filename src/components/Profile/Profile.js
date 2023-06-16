import clsx from "clsx";
import styles from './Profile.module.scss'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Table from 'react-bootstrap/Table';
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { useState,useEffect,useCallback } from "react";

import { useAxiosPrivate,useLogOut } from "~/hooks";
import { getOrderHistory } from "~/services/orderHistory";
import { useNavigate } from "react-router-dom";
import configs from "~/configs";
import { httpPrivate } from "~/utils/http";

function Profile() {
    const accessToken = useSelector(state => state.user.accessToken)
    const [orderHistorys,setOrderHistorys] = useState([]);
    const [email,setEmail] = useState('');
    const httpPrivates = useAxiosPrivate(httpPrivate);
    const navigate = useNavigate();
    const logout = useLogOut();
    const decodeJWT = jwtDecode(accessToken)
    const idUser = decodeJWT?.userInfo?.id;

    useEffect(()=>{
        const controller = new AbortController();
        const getListOrder = async ()=>{
            const result = await getOrderHistory(httpPrivates,idUser,'orderHistory',controller);
            if(result.statusCode === 500){
                setOrderHistorys([]);
                setEmail('');
                await logout()
                navigate(configs.routes.login,{ replace: true})
            }
            if(result.statusCode === 200){
                console.log(result.data)
                setOrderHistorys(result.data);
                setEmail(result.email);
            }
        }
        getListOrder();
        return ()=>{
            controller.abort();
        }
    },[idUser])

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
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Đơn hàng</th>
                                <th>Ngày</th>
                                <th>Chuyển đến</th>
                                <th>Địa chỉ</th>
                                <th>Giá trị đơn hàng</th>
                                <th>Tình trạng thanh toán</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orderHistorys.length ? (
                                    orderHistorys.map((orderHistory,ind)=>{
                                        return (
                                            <tr key={ind}>
                                                <th>{ind}</th>
                                                <th>{orderHistory?._id}</th>
                                                <th>{orderHistory?.createdAt}</th>
                                                <th>{orderHistory?.address?.details}</th>
                                                <th>{orderHistory?.address?.province}</th>
                                                <th>{orderHistory?.totalPrice}</th>
                                                <th>{orderHistory?.status}</th>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <th colSpan={7}>
                                            <p className={clsx(styles.textOrder)}>You haven't placed any orders yet.</p>
                                        </th>
                                    </tr>
                                )
                            }
                        </tbody>
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
