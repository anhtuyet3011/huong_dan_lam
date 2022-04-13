import React, { useEffect, useState } from 'react';
import '../../scss/payment.scss'
import '../../scss/common.scss'
import '../../scss/style.scss'
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PeopleSend from '../../components/payment/PeopleSend';
import PeopleRecieve from '../../components/payment/PeopleRecieve';
import OrderTime from '../../components/payment/OrderTime';
import OrderMessage from '../../components/payment/OrderMessage';
import OrderProduct from '../../components/payment/OrderProduct';
import { useDispatch } from 'react-redux';
import { addOrderThunk } from '../../redux/orderSlice';
import ModalSuccess from './ModalSuccess';

export default () => {
  let user = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cart = JSON.parse(localStorage.getItem("cart"));
  let searchCart = () => {
    if (cart) {
      let resp = [];
      cart.forEach(item => {
        resp.push({
          product: item?.productId,
          amount: item?.amount,
          price: Number((item?.price) * (item?.amount))
        })
      })
      setProducts(resp)
    }
  }
  useEffect(() => {
    searchCart()
  }, [])

  const [peopleSend, setPeopleSend] = useState({
    city: user.city,
    district: user.district,
    fullName: user.fullName,
    phoneNumber: user.phoneNumber,
    email: user.email
  });
  const [peopleRecieve, setPeopleRecieve] = useState({
    city: 1,
    district: 1
  });
  const [time, setTime] = useState({
    year: "2022",
    month: "Tháng 4",
    day: "20",
    hour: "18h"
  });
  const [message, setMessage] = useState({
    titleSend: "Anh, chị, em-Brother, sister",
    occasion: "Chúc mừng-Congratulations",
    noteSendToPersonReceive: "",
    noteSendToPersonAdmin: ""
  });

  const [code, setCode] = useState();
  function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }


  let data = {
    orderDto: {
      peopleSend,
      peopleRecieve,
      time,
      message,
      code: makeid(4)
    },
    orderProductDto: products
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  let handleOrder = async () => {
    let response = await dispatch(addOrderThunk(data));
    if (response) {
      setCode(response?.code)
      setShow(true)
    }
  }

  return (
    <>
      <Header />
      <ModalSuccess show={show} handleClose={handleClose} code={code} />

      <section className="payment">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-12 col-xl-6">
              <div className="payment-infor">
                <PeopleSend peopleSend={peopleSend} setPeopleSend={setPeopleSend} user={user} />
                <PeopleRecieve peopleRecieve={peopleRecieve} setPeopleRecieve={setPeopleRecieve} />

              </div>
              <div className="payment-infor__item">
                <OrderTime time={time} setTime={setTime} />
                <OrderMessage message={message} setMessage={setMessage} />
                <div className="button-order">
                  <div
                    style={{
                      width: 600,
                      height: 50,
                      background: '#351032',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      cursor: 'pointer'
                    }}

                    onClick={handleOrder}
                  >Đặt hàng</div>
                </div>
              </div>
            </div>
            <OrderProduct />
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}