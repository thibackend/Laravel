import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../../css/roomDetail.css';
const Checkout = (props) => {
    const [services, setServices] = useState(null);
    const [credit, setCredit] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);

    // hàm này kiểm tra người dùng click chọn bao nhiêu services.
    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const checked = event.target.checked;
        if (checked) {
            setSelectedServices([...selectedServices, value]);
        } else {
            setSelectedServices(selectedServices.filter((service) => service !== value));
        }
    };

    // ----------------------------------------------------------------------------------------------





    // hàm này dùng để kiểm tra thay đổi của credit khi mà người dùng click vào thì chuyển sang trạng thái true và hiện ô nhập số thẻ
    const handleCreditCardChange = (event) => {
        if (event.target.checked) {
            setCredit(true);
        } else {
            setCredit(false);
        }
    }
    // ----------------------------------------------------------------------------------
    // hàm này dùng để tạo validate form use Yup.



    useEffect(() => {
        if (!services) {
            setServices(props.services)
        }
        console.log("in checkout services:", services);
    }, [services]);

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card shadow-2">
                    <div style={{ background: '#ff5a60' }} className="card-header">
                        <h2 >$4000 / night</h2>
                    </div>
                    <form>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>CHECK-IN</label>
                                                <input type="date" name="checkin_day" className="checkinday form-control  bg-light" />
                                                {/* <small className="text-danger">{error.firstname}</small> */}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>CHECK-OUT</label>
                                                {/* onChange={handleInput} value={checkoutInput.firstname}  */}
                                                <input type="date" name="checkout_day" className="checkoutday form-control bg-light" />
                                                {/* <small className="text-danger">{error.firstname}</small> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-md-12">
                                            {/* show services */}
                                            <div className="row justify-content-between b-black rounded">
                                                {services ?
                                                    services.map(
                                                        (e, i) => (
                                                            <div className="col-md-6 my-2" key={e.id}>
                                                                <label htmlFor="service">
                                                                    <input
                                                                        type="checkbox"
                                                                        name="services"
                                                                        // value={e.id}
                                                                        id="service"
                                                                        onChange={handleCheckboxChange}
                                                                    />
                                                                    {e.name}
                                                                </label>
                                                            </div>
                                                        )
                                                    )
                                                    : ''
                                                }
                                            </div>
                                            {/* show so luong nguoi */}
                                            <div className="col-md-12">
                                                <div className="row align-items-center">
                                                    <div className="col-md-6 border-bottom rounded">
                                                        <label htmlFor="credit">
                                                            <input type="checkbox" name="checkCredit" id="credit" placeholder="Enter amount people" onChange={handleCreditCardChange} />
                                                            the tin dung
                                                        </label>
                                                    </div>
                                                    {
                                                        credit &&
                                                        <div className="row my-2 shadow rounded">
                                                            <div className="form-group">
                                                                <label htmlFor="credit">Your credit card</label>
                                                                <input type="number" className="form-control" name="credit" id="credit" placeholder=" Card number" />
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-12 my-3">
                                                <div className="row justify-content-between align-items-center">
                                                    <div className="col-md-6 border-bottom rounded">
                                                        <input type="number" className="border-none" name="people" id="people" placeholder="Enter amount people" />
                                                    </div>
                                                    <div className="col-md-6 border-bottom rounded">
                                                        <h6 >total: 3000$</h6>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group text-black">
                                            <button
                                                type="submit" className="nutdat dir dir-ltr hover-zoom">BOOK</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Checkout
