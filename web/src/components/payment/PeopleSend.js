import axios from 'axios';
import React, { useEffect, useState } from 'react';
export default ({ peopleSend, setPeopleSend, user }) => {
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [citySelect, setCitySelect] = useState();
  const [districtSelect, setDistrictSelect] = useState();

  let searchLocation = async () => {
    let responsive = await axios.get('https://provinces.open-api.vn/api/?depth=2');
    if (responsive.status === 200) {
      let cityDistricts = responsive.data.filter(item => item.code == user.city)[0];
      setCity(responsive.data);
      setCitySelect(user.city);
      setDistrict(cityDistricts.districts);
      setDistrictSelect(user.district)
    }
  }
  useEffect(() => {
    searchLocation() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let handleSelectCity = (e) => {
    setCitySelect(e.target.value);
    let cityDistricts = city.filter(item => item.code == e.target.value)?.[0];
    setDistrict(cityDistricts.districts);
    setDistrictSelect(cityDistricts.districts?.[0]?.code);
    setPeopleSend({
      ...peopleSend,
      city: e.target.value,
      district: cityDistricts.districts?.[0]?.code
    })
  }
  let handleSelectDistrict = (e) => {
    setDistrictSelect(e.target.value)
    setPeopleSend({
      ...peopleSend,
      district: e.target.value
    })
  }
  return (
    <>
      <h2>Thông tin người mua</h2>
      <div className="payment-infor__item">
        <label htmlFor="#">
          <span>*</span>
          Họ và tên:
        </label>
        <input type="text" className="input-name"
          onChange={e => {
            setPeopleSend({
              ...peopleSend,
              fullName: e.target.value
            })
          }}
          value={peopleSend.fullName}
        />
      </div>
      <div className="payment-infor__item">
        <label htmlFor="#">
          <span>*</span>
          Điện thoại:
        </label>
        <input type="text" className="input-name"
          onChange={e => {
            setPeopleSend({
              ...peopleSend,
              phoneNumber: e.target.value
            })
          }}
          value={peopleSend.phoneNumber}
        />
      </div>
      <div className="payment-infor__item">
        <label htmlFor="#">
          <span>*</span>
          Email của bạn:
        </label>
        <input type="text" className="input-name"
          onChange={e => {
            setPeopleSend({
              ...peopleSend,
              email: e.target.value
            })
          }}
          value={peopleSend?.email}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }} >
        <div>
          Tỉnh/Thành phố:
        </div>
        <select
          onChange={e => handleSelectCity(e)}
          value={citySelect}
        >
          {city.map((item, index) => {
            return (
              <option key={index} value={item.code} >{item.name}</option>
            )
          })}
        </select>
      </div>
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-between' }} >
        <div>
          Huyện:
        </div>
        <select
          onChange={e => handleSelectDistrict(e)}
          value={districtSelect}
        >
          {district?.map((item, index) => {
            return (
              <option key={index} value={item.code} >{item.name}</option>
            )
          })}
        </select>
      </div>
      <div className="payment-infor__item">
        <label htmlFor="#">
          <span>*</span>
          Địa chỉ:
        </label>
        <input type="text" className="input-name"
          onChange={e => {
            setPeopleSend({
              ...peopleSend,
              address: e.target.value
            })
          }}
        />
      </div>
    </>
  )
}