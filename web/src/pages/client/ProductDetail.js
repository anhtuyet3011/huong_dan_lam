import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../../scss/home.scss';
import '../../scss/product-detail.scss';
import Header from '../../components/layout/Header'
import { SERVER } from '../../apis/API';
import { useDispatch } from 'react-redux';
import { getTagThunk } from '../../redux/tagSlice';
import { Routes } from '../../routes';
import { useToasts } from 'react-toast-notifications';
export default () => {
  const location = useLocation();
  const history = useHistory();
  const product = location.state;
  let { addToast } = useToasts();
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      let isProductCart = cart.filter(item => item.productId == product._id);
      if (isProductCart.length > 0) {
        addToast("Sản phẩm đã có trong giỏ hàng", { appearance: 'warning', autoDismiss: '1000' })
      } else {
        cart.push({
          productId: product._id,
          price: product?.price,
          amount: 1,
        });
        localStorage.setItem("cart", JSON.stringify(cart))
        addToast("Thêm vào giỏ hàng thành công", { appearance: 'success', autoDismiss: '1000' })
        history.push(Routes.Cart.path)

      }
    } else {
      let cartNew = [];
      cartNew.push({
        productId: product._id,
        price: product?.price,
        amount: 1,
      });
      localStorage.setItem("cart", JSON.stringify(cartNew))
      addToast("Thêm vào giỏ hàng thành công", { appearance: 'success', autoDismiss: '1000' })
      history.push(Routes.Cart.path)
    }

  }
  return (
    <>
      <>
        <Header />
        <section className="detail pt-4 pb-4 ">
          <div className="container ">
            <ul className="crumbs">
              <li>
                <h4>
                  <a className="crumbs-items" href='/#' >
                    {product?.category?.title}
                  </a>
                </h4>
              </li>
              <li>
                <h4>
                  <a className="crumbs-items" href="/#">
                    {product?.tag?.title}
                  </a>
                </h4>
              </li>
            </ul>
            <div className="detail-content">
              <div className="detail-content__img">
                <img
                  src={`${SERVER.URL_IMAGE}${product?.photoURL}`}
                  alt="product"
                />

              </div>
              <div className="detail-content__product">
                <h2>{product?.title}</h2>
                <div className="single-price">
                  <span className="price">{product?.price} đ</span>
                </div>
                <div className="summary" dangerouslySetInnerHTML={{ __html: product?.content }} >

                </div>
                <div className="attention">
                  <h4>LƯU Ý</h4>
                  <p dangerouslySetInnerHTML={{ __html: product?.warn }} ></p>
                </div>
                {/* <div className="area-order">
                  <a href="/#" className="add-cart on-hand">
                    Giỏ hàng đã có
                  </a>
                  <a href="/#" className="buy-now">
                    Mua ngay
                  </a>
                </div> */}
                <div className="on-phone">
                  <div className="call-now"
                    onClick={() => {
                      addToCart()
                    }}
                  >
                    Thêm vào giỏ
                  </div>
                </div>
                <div className="offer">
                  <h4>ƯU ĐÃI ĐẶC BIỆT</h4>
                  <ul className="benefit" dangerouslySetInnerHTML={{ __html: product?.animate }} >

                  </ul>
                </div>
                <TagProduct product={product} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="services-title">
              <h3> BẠN NÊN DÙNG DỊCH VỤ CỦA CHÚNG TÔI VÌ</h3>
            </div>
          </div>
        </section>
        <section className="services-content">
          <div className="container">
            <div className="services-item row">
              <div className="col-12 col-md-6 col-lg-4 col-xl-3  ">
                <div className="box-services">
                  <div className="services-img">
                    <img
                      src="	https://hyt.r.worldssl.net/images/icon-free-ship.png
                      "
                      alt="img"
                    />
                  </div>
                  <div className="services-text">
                    <div className="services-tit">
                      <span>MIỄM GIAO HÀNG 63 TỈNH THÀNH</span>
                    </div>
                    <div className="services-desc">
                      <span>Free shipping(nội thành)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xl-3 ">
                <div className="box-services">
                  <div className="services-img">
                    <img
                      src="	https://hyt.r.worldssl.net/images/icon-free-ship.png
                      "
                      alt="img"
                    />
                  </div>
                  <div className="services-text">
                    <div className="services-tit">
                      <span>MIỄM GIAO HÀNG 63 TỈNH THÀNH</span>
                    </div>
                    <div className="services-desc">
                      <span>Free shipping(nội thành)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                <div className="box-services">
                  <div className="services-img">
                    <img
                      src="	https://hyt.r.worldssl.net/images/icon-free-ship.png
                      "
                      alt="img"
                    />
                  </div>
                  <div className="services-text">
                    <div className="services-tit">
                      <span>MIỄM GIAO HÀNG 63 TỈNH THÀNH</span>
                    </div>
                    <div className="services-desc">
                      <span>Free shipping(nội thành)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xl-3 ">
                <div className="box-services">
                  <div className="services-img">
                    <img
                      src="	https://hyt.r.worldssl.net/images/icon-free-ship.png
                      "
                      alt="img"
                    />
                  </div>
                  <div className="services-text">
                    <div className="services-tit">
                      <span>MIỄM GIAO HÀNG 63 TỈNH THÀNH</span>
                    </div>
                    <div className="services-desc">
                      <span>Free shipping(nội thành)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="services-item row">
              <div className="col-12 col-md-6 col-lg-4 col-xl-3 ">
                <div className="box-services">
                  <div className="services-img">
                    <img
                      src="	https://hyt.r.worldssl.net/images/icon-free-ship.png
                      "
                      alt="img"
                    />
                  </div>
                  <div className="services-text">
                    <div className="services-tit">
                      <span>MIỄM GIAO HÀNG 63 TỈNH THÀNH</span>
                    </div>
                    <div className="services-desc">
                      <span>Free shipping(nội thành)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                <div className="box-services">
                  <div className="services-img">
                    <img
                      src="	https://hyt.r.worldssl.net/images/icon-free-ship.png
                      "
                      alt="img"
                    />
                  </div>
                  <div className="services-text">
                    <div className="services-tit">
                      <span>MIỄM GIAO HÀNG 63 TỈNH THÀNH</span>
                    </div>
                    <div className="services-desc">
                      <span>Free shipping(nội thành)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xl-3 ">
                <div className="box-services">
                  <div className="services-img">
                    <img
                      src="	https://hyt.r.worldssl.net/images/icon-free-ship.png
                      "
                      alt="img"
                    />
                  </div>
                  <div className="services-text">
                    <div className="services-tit">
                      <span>MIỄM GIAO HÀNG 63 TỈNH THÀNH</span>
                    </div>
                    <div className="services-desc">
                      <span>Free shipping(nội thành)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                <div className="box-services">
                  <div className="services-img">
                    <img
                      src="	https://hyt.r.worldssl.net/images/icon-free-ship.png
                      "
                      alt="img"
                    />
                  </div>
                  <div className="services-text">
                    <div className="services-tit">
                      <span>MIỄM GIAO HÀNG 63 TỈNH THÀNH</span>
                    </div>
                    <div className="services-desc">
                      <span>Free shipping(nội thành)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>

    </>
  )
}


function TagProduct({ product }) {
  const [tags, setTags] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const searchTags = async () => {
    let resp = await dispatch(getTagThunk(product?.category?._id));
    if (resp) {
      setTags(resp)
    }
  }
  useEffect(() => {
    searchTags()
  }, [product?.category?._id])
  return (
    <>
      <div className="sp-item">
        <h2>CÁC NHÓM HOA</h2>
        {tags && tags?.map((item, index) => {
          return (
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                history.push({
                  pathname: Routes.ProductTagPage.path,
                  state: item
                })
              }}
              key={index} >{item?.title}</div>
          )
        })}
      </div>
    </>
  )
}