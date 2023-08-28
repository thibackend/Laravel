import React, { useState, useEffect } from 'react';
<<<<<<< HEAD

=======
>>>>>>> 70db86440c6ee76b8a1aa662d1fed40cd08c8b9f
import './boking.css';
import { Navigate, useNavigate } from 'react-router-dom';
const FormBooking = () => {
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState('');
  const [room_price, setRoomPrice] = useState(1000);
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [cleaningFee, setCleaningFee] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [invalidDate, setInvalidDate] = useState(false); // Thêm state để lưu trạng thái ngày đặt phòng không hợp lệ
  useEffect(() => {
    calculatePrice();
    const currentDate = new Date().toISOString().split('T')[0];
    if (checkInDate < currentDate) {
      setInvalidDate(true); // Đặt trạng thái ngày đặt phòng không hợp lệ thành true
      return;
    }
    setInvalidDate(false);
  }, [checkInDate, checkOutDate, numberOfGuests]);
<<<<<<< HEAD
=======
  // const handleCheckInChange = (event) => {
  //   setCheckInDate(event.target.value);
  // };

  // const handleCheckOutChange = (event) => {
  //   setCheckOutDate(event.target.value);
  // };

  // const handleGuestsChange = (event) => {
  //   setNumberOfGuests(event.target.value);
  // };

>>>>>>> 70db86440c6ee76b8a1aa662d1fed40cd08c8b9f
  const calculatePrice = () => {
    const nights = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 3600 * 24)); // Số đêm
    setNumberOfNights(nights);
    const basePrice = room_price * nights * numberOfGuests;
    const cleaningFeeValue = 50; // Phí vệ sinh
    const serviceFeeValue = 20; // Phí dịch vụ
    const totalPriceValue = basePrice + cleaningFeeValue + serviceFeeValue;
    setCleaningFee(cleaningFeeValue);
    setServiceFee(serviceFeeValue);
    setTotalPrice(totalPriceValue);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
<<<<<<< HEAD
    if (totalPrice <= 0) {
      alert('Giá trị không hợp lệ');
      // Hiển thị thông báo cho người dùng rằng giá trị không hợp lệ
      return;
    }
=======
>>>>>>> 70db86440c6ee76b8a1aa662d1fed40cd08c8b9f
    let datacheckout = {
      checkInDate,
      checkOutDate,
      numberOfNights,
      room_price,
      numberOfGuests,
      totalPrice,
      serviceFee,
      cleaningFee
    }
    localStorage.setItem('datacheckout', JSON.stringify(datacheckout));
<<<<<<< HEAD
    navigate('/confirm');
=======
    navigate('/checkout');
>>>>>>> 70db86440c6ee76b8a1aa662d1fed40cd08c8b9f
  };

  return (
    <div className='container'>
<<<<<<< HEAD
      <form onSubmit={handleSubmit} className='containers my-4'>
        <center>
          <div className="form-group">
            <label htmlFor="checkInDate">Ngày đặt:</label>
            <input type="date" className="form-control" id="checkInDate" value={checkInDate} onChange={(e) =>
              setCheckInDate(e.target.value)} min={currentDate} // Thêm thuộc tính min
            />
          </div>
          <div className="form-group">
            <label htmlFor="checkOutDate">Ngày trả:</label>
            <input type="date" className="form-control" id="checkOutDate"
              value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)}
              min={checkInDate} // Thêm thuộc tính min, giá trị là ngày đặt 
            />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfGuests">Số lượng người:</label>
            <input
              type="number"
              className="form-control"
              id="numberOfGuests"
              value={numberOfGuests}
              min="1"
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Đặt phòng</button>
          {/* Hiển thị thông báo ngày đặt phòng không hợp lệ */}

          {/* Hiển thị giá phòng dựa trên số ngày đặt */}
          {numberOfNights > 0 && (
            <p className='tex-name'>Giá phòng ({numberOfNights} ): {room_price * numberOfNights} VNĐ</p>
          )}
          {numberOfNights > 0 && (
            <p className='tex-name'>Số ngày đặt: {numberOfNights} Ngày</p>
          )}
          <p className='tex-name'>Phí vệ sinh: {cleaningFee} VNĐ</p>
          <p className='tex-name'>Phí dịch vụ: {serviceFee} VNĐ</p>
          <hr></hr>
          {totalPrice >= 0 && (
            <p className='tex-name tex-name2'>Tổng giá: {totalPrice} VNĐ</p>
          )}
        </center>
=======
      <form onSubmit={handleSubmit} className='containers'>
        <div className="form-group">
          <label htmlFor="checkInDate">Ngày đặt:</label>
          <input
            type="date"
            className="form-control"
            id="checkInDate"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="checkOutDate">Ngày trả:</label>
          <input
            type="date"
            className="form-control"
            id="checkOutDate"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="numberOfGuests">Số lượng người:</label>
          <input
            type="number"
            className="form-control"
            id="numberOfGuests"
            value={numberOfGuests}
            min="1"
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Đặt phòng</button>
        {/* Hiển thị thông báo ngày đặt phòng không hợp lệ */}
        {invalidDate && (
          <p className="error-message">Vui lòng chọn ngày đặt phòng không nhỏ hơn ngày hiện tại!</p>
        )}
        {/* Hiển thị giá phòng dựa trên số ngày đặt */}
        {numberOfNights > 0 && (
          <p className='tex-name'>Giá phòng ({numberOfNights} ngày): {room_price* numberOfNights} VNĐ</p>
        )}
        {numberOfNights > 0 && (
          <p className='tex-name'>Số ngày đặt: {numberOfNights} Ngày</p>
        )}
        <p className='tex-name'>Phí vệ sinh: {cleaningFee} VNĐ</p>
        <p className='tex-name'>Phí dịch vụ: {serviceFee} VNĐ</p>
        <hr></hr>
        <p className='tex-name tex-name2'>Tổng giá: {totalPrice} VNĐ</p>
>>>>>>> 70db86440c6ee76b8a1aa662d1fed40cd08c8b9f
      </form>
    </div>
  );
};

<<<<<<< HEAD
export default FormBooking;
=======
export default FormBooking;
>>>>>>> 70db86440c6ee76b8a1aa662d1fed40cd08c8b9f
