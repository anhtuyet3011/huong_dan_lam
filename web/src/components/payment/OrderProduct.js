import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SERVER } from '../../apis/API';
import { getProductByIdThunk } from '../../redux/productSlice';
export default () => {
  const [carts, setCarts] = useState([]);
  const search = () => {
    const cartLocalStorage = JSON.parse(localStorage.getItem("cart"));
    if (cartLocalStorage) {
      setCarts(cartLocalStorage);
    } else {
      setCarts([])
    }
  }

  useEffect(() => {
    search()
  }, []);
  return (
    <>
      <div className="col-12 col-md-12 col-xl-6">
        {carts.length > 0 && carts.map((item, index) => {
          return (
            <Products productCart={item} key={index} />
          )
        })}
        <TotalPrice carts={carts} />
      </div>
    </>
  )
}


function Products({ productCart }) {
  const [product, setProduct] = useState();
  const dispatch = useDispatch();
  const searchProduct = async () => {
    let resp = await dispatch(getProductByIdThunk(productCart?.productId));
    if (resp) {
      setProduct(resp)
    }
  }
  useEffect(() => {
    searchProduct()
  }, [productCart.productId]);
  return (
    <>
      <div className="bill-card">
        <div className="img" style={{
          display: 'flex', alignItems: 'center'
        }} >
          {product?.photoURL && <img
            src={`${SERVER.URL_IMAGE}${product?.photoURL}`}
            alt="img"
          />}
        </div>
        <div className="text-product">
          <div>{product?.title}</div>
          <p>
            <span>{productCart?.amount} x {product?.price} đ</span>
          </p>
        </div>
      </div>
    </>
  )
}


function TotalPrice({ carts }) {
  const [price, setPrice] = useState(0);
  const searchPrice = async () => {
    let total = 0;
    carts.forEach(item => {
      total += Number((item.price) * (item.amount))
    })
    setPrice(total)
  }
  useEffect(() => {
    searchPrice()
  }, [carts]);
  return (
    <>
      <div className="calculation">

      </div>
      <div className="each-row">
        <span style={{ fontWeight: 600 }}>Tổng cộng:</span>
        <strong>{price} d</strong>
      </div>
    </>
  )
}