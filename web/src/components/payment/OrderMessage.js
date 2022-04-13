import React from 'react';
export default ({ message, setMessage }) => {
  return (
    <>
      <h2>Lời nhắn</h2>
      <div className="give">
        <label htmlFor="#">Thiệp tặng cho:</label>
        <select className="input-name"
          value={message?.titleSend}
          onChange={e => {
            setMessage({
              ...message,
              titleSend: e.target.value
            })
          }}
        >
          <option value={"Anh, chị, em-Brother, sister"} >Anh, chị, em-Brother, sister</option>
          <option value={"Bạn bè-Friends"} >Bạn bè-Friends</option>
          <option value={"Bố mẹ-Parent"} >Bố mẹ-Parent</option>
          <option value={"Chồng-Husband"} >Chồng-Husband</option>
          <option value={"Đặt giúp người khác-not me"} >Đặt giúp người khác-not me</option>
        </select>
      </div>
      <div className="occation">
        <label htmlFor="#">Nhân dịp:</label>
        <select className="input-name"
          value={message?.occasion}
          onChange={e => {
            setMessage({
              ...message,
              occasion: e.target.value
            })
          }}
        >
          <option value={"Chúc mừng-Congratulations"} >Chúc mừng-Congratulations</option>
          <option value={"Khai trương-Grand opening"} >Khai trương-Grand opening</option>
          <option value={"Sinh nhật-Birthday"} >Sinh nhật-Birthday</option>
          <option value={"Cảm ơn-Thankyou"} >Cảm ơn-Thankyou</option>
          <option value={"Chia buồn-Sympathy"}>Chia buồn-Sympathy</option>
        </select>
      </div>
      <label>Thông điệp</label>
      <div>
        <textarea
          name="message"
          id="#"
          cols={30}
          rows={2}
          style={{ width: "100%" }}
          value={message?.noteSendToPersonReceive}
          onChange={e => {
            setMessage({
              ...message,
              noteSendToPersonReceive: e.target.value
            })
          }}
        />
      </div>
      <label style={{ width: "100%" }}>
        Lời nhắn cho Hoayeuthuong.com.
      </label>
      <div>
        <textarea
          name="message"
          id="#"
          cols={30}
          rows={2}
          style={{ width: "100%" }}
          value={message?.noteSendToPersonAdmin}
          onChange={e => {
            setMessage({
              ...message,
              noteSendToPersonAdmin: e.target.value
            })
          }}
        />
      </div>
    </>
  )
}