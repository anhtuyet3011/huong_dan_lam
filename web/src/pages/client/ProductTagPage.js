import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { SERVER } from '../../apis/API';
import { getProductByTagThunk } from '../../redux/productSlice';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { Routes } from '../../routes';
export default () => {
  const location = useLocation();
  const history = useHistory();
  const tag = location.state;
  const [products, setProducts] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    searchProduct()
  }, [tag])
  const searchProduct = async () => {
    let resp = await dispatch(getProductByTagThunk(tag?._id));
    if (resp) {
      setProducts(resp)
    }
  }

  return (

    <>
      <Header />
      <div className="container gift-add">
        <h2 className="gift-title">{tag?.title}</h2>
      </div>
      <section className="gift-choose pb-4 ">
        <div className="container box-gift pb-4">
          <div className="row">
            {products && products?.map((item, index) => {
              return (
                <div className="col-12 col-md-6 col-lg-4 col-xl-3" key={index}
                  onClick={() => history.push({
                    pathname: Routes.ProductDetail.path,
                    state: item
                  })}
                >
                  <div className="box-item">
                    <div className="img-gift" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                      <img
                        src={`${SERVER.URL_IMAGE}${item?.photoURL}`}
                        alt="bear"
                        width={120}
                        height={80}
                      />
                    </div>
                    <div className="cost-name">
                      <div className="gift-name">
                        <a href="/#">{item?.title}</a>
                      </div>
                      <div className="gift-cost">
                        <span>{item?.price} đ</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}