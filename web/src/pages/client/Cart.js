import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { SERVER } from '../../apis/API';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import { getProductByIdThunk } from '../../redux/productSlice';
import { Routes } from '../../routes';
import '../../scss/cart.scss'


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
      <Header />
      <section className="cart-detail">
        <div className="container cart">
          <div className="title">
            <ul>
              <li>
                <h2 className="text-before">Trang chủ</h2>
              </li>
              <li>
                <h2>Giỏ hàng</h2>
              </li>
            </ul>
          </div>
          {carts.length > 0 ? <>
            <>
              <div className="cart-content">
                {carts.map((item, index) => {
                  return (
                    <ProductItem productCart={item} key={index} search={search} carts={carts} />
                  )
                })}
              </div>
              <FormPrice carts={carts} />
            </>
          </> : <div>
            <br />
            Giỏ hàng trống
          </div>}
        </div>
      </section>
      <Footer />
    </>
  )
}

function ProductItem({ productCart, search, carts }) {
  const [product, setProduct] = useState();
  let { addToast } = useToasts();
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
  const deleteProductCart = (productId) => {
    let cartProducts = carts;
    let index = cartProducts.findIndex(item => item.productId == productId);
    cartProducts.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartProducts));
    addToast("Xóa sản phẩm thành công", { appearance: 'success', autoDismiss: '1000' })
    search();
  }
  let add = (productId) => {
    let amount = productCart.amount + 1;
    let cartProducts = carts;
    let index = cartProducts.findIndex(item => item.productId == productId);
    cartProducts[index] = {
      productId: productId,
      price: product?.price,
      amount
    }
    localStorage.setItem("cart", JSON.stringify(cartProducts));
    search();
  }

  let minus = (productId) => {
    let amount = productCart.amount - 1;
    if (amount == 0) {
      deleteProductCart(productId)
    } else {
      let cartProducts = carts;
      let index = cartProducts.findIndex(item => item.productId == productId);
      cartProducts[index] = {
        productId: productId,
        price: product?.price,
        amount
      }
      localStorage.setItem("cart", JSON.stringify(cartProducts));
      search();
    }

  }

  return (
    <>
      <div className="cart-item">
        <div className="cart-item__img" style={{ display: 'flex', alignItems: 'center' }} >
          {product?.photoURL && <img
            src={`${SERVER.URL_IMAGE}${product?.photoURL}`}
            alt="img"
          />}
        </div>
        <div className="text">
          <p>{product?.title}</p>
          <p>
            <span>{Number((productCart?.amount) * (product?.price))} đ</span>
          </p>
          <div className="amount">
            <div className="minus"
              onClick={() => {
                minus(product?._id)
              }}
            ></div>
            <div style={{
              width: 32, height: 32, display: 'flex', justifyContent: 'center',
              alignItems: 'center', border: '1px solid #ececec'
            }} >{productCart?.amount}</div>
            <div className="plus"
              onClick={() => {
                add(product?._id)
              }}
            ></div>
          </div>
        </div>
        <div className="close remove-item" onClick={() => deleteProductCart(product?._id)}>
          X
        </div>
      </div>
    </>
  )
}

function FormPrice({ carts }) {
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
  const history = useHistory();
  return (
    <>
      <div className="total-bill">
        <div className="each-row">
          <span>Tổng cộng</span>
          <strong>{price} đ</strong>
        </div>
        <div className="row each-row"  >
          <div
            onClick={() => {
              history.push(Routes.Payment.path)
            }}
            style={{ padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          ><div style={{
            width: 100, height: 40, background: '#351032', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', marginTop: 30, marginLeft: 20, borderRadius: 20, cursor: 'pointer'
          }} >
              Đặt hàng
            </div></div>
        </div>
      </div>
    </>
  )
}