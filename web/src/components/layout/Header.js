import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../routes';
import '../../scss/style.scss';
import Navbar from './Navbar';
export default () => {
    const history = useHistory();
    const [products, setProducts] = useState([]);
    const search = () => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cart) {
            setProducts(cart)
        } else {
            setProducts([])
        }
    }
    useEffect(() => {
        search()
    },[])
    return (
        <>
            <section className="navbar">
                <div className="container navbar__content ">
                    <div className="nabar__content--logo" style={{ cursor: 'pointer' }}
                        onClick={() => {
                            history.push(Routes.DashboardOverview.path)
                        }}
                    >
                        <img
                            style={{ paddingBottom: 20, width: 280, cursor: "pointer" }}
                            src="https://hyt.r.worldssl.net/images/logo-hoa-yeu-thuong.png"
                            alt="logo"
                        />
                    </div>
                    <div className="navbar__content--main  ">
                        <div className="navbar-main__search">
                            <input
                                type="text"
                                placeholder="Tìm sản phẩm..."
                                style={{ paddingLeft: 10 }}
                            />
                            <button className="navbar-main__search--button">Tìm kiếm</button>
                        </div>
                        <ul className="navbar-main__contact">
                            <li className="navbar-main__contact--item">
                                <label>HOT LINE LIÊN HỆ</label>
                                <div>
                                    <span>0397012576</span>
                                </div>
                            </li>
                            <li className="navbar-main__contact--item">
                                <img
                                    src="	https://www.freeiconspng.com/uploads/facebook-png-icon-follow-us-facebook-1.png"
                                    style={{ width: 30 }}
                                    alt="facebook"
                                />
                                <a href="https://www.facebook.com/logi.30/">logi</a>
                            </li>
                            <li className="navbar-main__contact--item">
                                <img
                                    src="	https://hyt.r.worldssl.net/images/zalo-chat-icon.png"
                                    alt="zalo"
                                />
                            </li>
                        </ul>
                    </div>
                    <div className="navbar__content--icon">
                        <div className="navbar-icon">
                            <div
                                onClick={() => {
                                    history.push(Routes.Cart.path)
                                }}
                                className="navbar-icon__svg"
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src="https://hyt.r.worldssl.net/images/shopping-bag.png"
                                    alt="cart"
                                    className="img-cart"
                                    style={{ paddingLeft: 15 }}
                                />
                                <div className="navbar-icon__title">
                                    <span>Giỏ hàng {products.length > 0 && `(${products.length})`} </span>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="menu__item">
                        <svg style={{ width: 30, height: 30 }} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11A1.5,1.5 0 0,1 10.5,9.5A1.5,1.5 0 0,1 12,8A1.5,1.5 0 0,1 13.5,9.5A1.5,1.5 0 0,1 12,11Z" />
                        </svg>

                        <div className="sub">
                            <ul className="sub__item">
                                <li className="sub__item--content"
                                    onClick={() => history.push(Routes.Settings.path)}
                                ><FontAwesomeIcon icon={faUserCircle} className="me-2" /> My Profile</li>
                                <li className="sub__item--content"
                                    onClick={() => history.push(Routes.ChangePassword.path)}
                                ><FontAwesomeIcon icon={faCog} className="me-2" />  Change password</li>
                                <li className="sub__item--content"
                                    onClick={() => {
                                        localStorage.clear();
                                        history.push(Routes.Signin.path)
                                    }}
                                ><FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Log out</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Navbar />

        </>

    )
}