import React, { useState, useEffect } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../css/roomDetail.css';
const Checkout = (props) => {

    // tao schema validate cho data.
    
    const schema = yup.object().shape({
        email: yup.string().email().min(4).max(100).required(),
        password: yup.string().min(4).max(40).required(),
    });



    const formik = useFormik({
        initialValues: {
            CheckIn: '',
            CheckOut: '',
        },
        validationSchema: Yup.object({
            CheckIn: Yup.date().required('Vui lòng nhập ngày check-in.'),
            CheckOut: Yup.date()
                .min(Yup.ref('CheckIn'), 'Ngày check-out phải sau ngày check-in.')
                .required('Vui lòng nhập ngày check-out.'),
        }),
        onSubmit: (values) => {
            console.log("Ngày Đặt và ngày trả: ", values);
        },
    });


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
    }, [services]);

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card shadow-2">
                    <div style={{ background: '#ff5a60' }} className="card-header">
                        <h2 >${props.price} / night</h2>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                {/* Input của ô Check In */}
                                                <label>CHECK-IN</label>
                                                <input type="date" name="CheckIn" className="checkinday form-control  bg-light" />
                                                {formik.touched.CheckIn && formik.errors.CheckIn && (
                                                    <div style={{ color: 'red' }}>{formik.errors.CheckIn}</div>
                                                )}

                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">

                                                {/* Input của checkout -------- */}
                                                <label>CHECK-OUT</label>


                                                <input type="date" name="CheckOut" className="checkoutday form-control bg-light" />
                                                {formik.touched.CheckOut && formik.errors.CheckOut && (
                                                    <div >{formik.errors.CheckOut}</div>
                                                )}
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

                                            <div className="col-md-12 my-3">
                                                <div className="row justify-content-between align-items-center">
                                                    <div className="col-md-7 border-bottom rounded">
                                                        <input type="number" className="form-control border-none" name="people" id="people" placeholder="Enter amount people" />
                                                    </div>
                                                    <div className="col-md-5 border-bottom rounded">
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
