import React from 'react';
export default ({ time, setTime }) => {
  return (
    <>
      <h2>Thời gian giao hàng</h2>
      <div className="time-ship" style={{ display: 'flex' }} >
        <div>
          <div><label>Năm</label></div>
          <select className="time-ship__box"
            value={time?.year}
            onChange={e => setTime({
              ...time,
              year: e.target.value
              
            })}
          >
            <option value={"2022"} >2022</option>
            <option value={"2023"} >2023</option>
          </select>
        </div>

        <div>
          <div><label>Tháng</label></div>
          <select className="time-ship__box"
            value={time?.month}
            onChange={e => setTime({
              ...time,
              month: e.target.value
            })}
          >
            <option value={"Tháng 1"} >Tháng 1</option>
            <option value={"Tháng 2"}>Tháng 2</option>
            <option value={"Tháng 3"}>Tháng 3</option>
            <option value={"Tháng 4"}>Tháng 4</option>
            <option value={"Tháng 5"}>Tháng 5</option>
            <option value={"Tháng 6"}>Tháng 6</option>
            <option value={"Tháng 7"}>Tháng 7</option>
            <option value={"Tháng 8"}>Tháng 8</option>
            <option value={"Tháng 9"}>Tháng 9</option>
            <option value={"Tháng 10"}>Tháng 10</option>
            <option value={"Tháng 11"}>Tháng 11</option>
            <option value={"Tháng 12"}>Tháng 12</option>
          </select>
        </div>
        <div>
          <div><label>Ngày</label></div>
          <select className="time-ship__box"
            value={time?.day}
            onChange={e => setTime({
              ...time,
              day: e.target.value
            })}
          >
            <option value={"1"} >1</option>
            <option value={"2"}>2</option>
            <option value={"3"}>3</option>
            <option value={"4"}>4</option>
            <option value={"5"}>5</option>
            <option value={"6"}>6</option>
            <option value={"7"}>7</option>
            <option value={"8"}>8</option>
            <option value={"9"}>9</option>
            <option value={"10"}>10</option>
            <option value={"11"}>11</option>
            <option value={"12"}>12</option>
            <option value={"13"}>13</option>
            <option value={"14"}>14</option>
            <option value={"15"}>15</option>
            <option value={"16"}>16</option>
            <option value={"17"}>17</option>
            <option value={"18"}>18</option>
            <option value={"19"}>19</option>
            <option value={"20"}>20</option>
            <option value={"21"}>21</option>
            <option value={"22"}>22</option>
            <option value={"23"}>23</option>
            <option value={"24"}>24</option>
            <option value={"25"}>25</option>
            <option value={"26"}>26</option>
            <option value={"27"}>27</option>
          </select>
        </div>
        <div>
          <label>Giờ</label>
          <input
            value={time?.hour}
            onChange={e => setTime({
              ...time,
              hour: e.target.value
            })}
          />
        </div>
      </div>
    </>
  )
}