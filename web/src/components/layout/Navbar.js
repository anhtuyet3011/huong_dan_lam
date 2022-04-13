import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCategoryThunk } from '../../redux/categorySlice';
import { getTagThunk } from '../../redux/tagSlice';
import '../../scss/style.scss';
import { Routes } from '../../routes';
export default () => {
  const category = useSelector(state => state.category.data);
  const dispatch = useDispatch();
  const search = async () => {
    dispatch(getCategoryThunk());
  }
  useEffect(() => {
    search()
  }, []);
  const history = useHistory();
  return (
    <>
      <section className="menu">
        <div className="container">
          <ul className="ul-navbar">
            <li className="navbar-item">
              <div className="padding"
              style={{cursor:'pointer'}} onClick={() => history.push(Routes.DashboardOverview.path)}
              >Trang chủ</div>
            </li>
            {category && category?.map((item, index) => {
              return (
                <CategoryItem key={index} category={item} />
              )
            })}
            <li className="navbar-item meaningful">
              <div className="meaningful padding">Ý nghĩa hoa</div>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}


function CategoryItem({ category }) {
  const [tags, setTags] = useState();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const searchTags = async () => {
    let resp = await dispatch(getTagThunk(category._id));
    if (resp) {
      setTags(resp)
    }
  }
  useEffect(() => {
    searchTags()
  }, [category])
  return (
    <li className="navbar-item topic" onClick={() => setShow(!show)}  >
      <div className="topic padding"

      >{category?.title}</div>
      {show && <ul className="sub-menu topic-content">
        {tags?.length > 0 && tags?.map((item, index) => {
          return (
            <li className="item" key={index}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                history.push({
                  pathname: Routes.ProductTagPage.path,
                  state: item
                })
              }}
            >{item?.title}</li>
          )
        })}
      </ul>}
    </li>
  )
}