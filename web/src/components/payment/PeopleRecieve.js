import axios from 'axios';
import React, { useEffect, useState } from 'react';
export default ({ peopleRecieve, setPeopleRecieve }) => {
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [citySelect, setCitySelect] = useState();
  const [districtSelect, setDistrictSelect] = useState();

  let searchLocation = async () => {
    let responsive = await axios.get('https://provinces.open-api.vn/api/?depth=2');
    if (responsive.status === 200) {
      setCity(responsive.data);
      setCitySelect(responsive.data[0].code)
      setDistrict(responsive.data[0].districts);
      setDistrictSelect(responsive.data[0]?.districts?.[0]?.code)
    }
  }
  let handleSelectCity = (e) => {
    setCitySelect(e.target.value);
    let cityDistricts = city.filter(item => item.code == e.target.value)?.[0];
    setDistrict(cityDistricts.districts);
    setDistrictSelect(cityDistricts.districts?.[0]?.code);
    setPeopleRecieve({
      ...peopleRecieve,
      city: e.target.value,
      district: cityDistricts.districts?.[0]?.code
    })
  }
  let handleSelectDistrict = (e) => {
    setDistrictSelect(e.target.value)
    setPeopleRecieve({
      ...peopleRecieve,
      district: e.target.value
    })
  }
  useEffect(() => {
    searchLocation()
  }, [])
  return (
    <>
      <h2>Thông tin người nhận</h2>
      <div className="payment-infor__item">
        <label htmlFor="#">
          <span>*</span>
          Tên người nhận:
        </label>
        <input type="text" className="input-name"
          onChange={e => {
            setPeopleRecieve({
              ...peopleRecieve,
              fullName: e.target.value
            })
          }}
        />
      </div>
      <div className="payment-infor__item">
        <label htmlFor="#">
          <span>*</span>
          Điện thoại:
        </label>
        <input type="text" className="input-name"
          onChange={e => {
            setPeopleRecieve({
              ...peopleRecieve,
              phoneNumber: e.target.value
            })
          }}
        />
      </div>
      <div className="payment-infor__item">
        <label htmlFor="#">
          <span>*</span>
          Email của bạn:
        </label>
        <input type="text" className="input-name"
          onChange={e => {
            setPeopleRecieve({
              ...peopleRecieve,
              email: e.target.value
            })
          }}
          value={peopleRecieve?.email}
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
            setPeopleRecieve({
              ...peopleRecieve,
              address: e.target.value
            })
          }}
        />
      </div>
    </>
  )
}