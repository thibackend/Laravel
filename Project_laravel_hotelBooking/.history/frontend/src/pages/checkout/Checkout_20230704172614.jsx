import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../css/roomDetail.css';
const Checkout = (props) => {

    // thực hiện khai báo các state được sữ dụng.
    const [services, setServices] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);

    // tao schema validate cho data.
    const schema = yup.object().shape({
        CheckIn:
            yup
                .date("Phải là kiểu dữ liệu thời!")
                .required("Cần nhập trường này!")
                .min(new Date(), "Trường này nên lớn hơn hoặc bằng hiện tại!"),
        CheckOut:
            yup
                .date("trường này nhập ngày tháng!")
                .required("Cần nhập trường ngày!")
                .min(yup.ref('CheckIn'), "Ngày trả phải lớn hơn ngày đặt!")
                .min(new Date(), "Trường này nên lớn hơn hoặc bằng hiện tại!"),
    });
    // khai báo các chức năng hổ trợ việc validate.
    const {
        register,
        handleSubmit,
        formState: { errors }, // dùng để hiển thị lỗi.
    } = useForm({ resolver: yupResolver(schema) });

    // thực hiện lấy data để xữ lý.
    const handleCheckOut = (data) => {
        console.log("data check out: ", data);
    }


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
                    <form onSubmit={handleSubmit(handleCheckOut)}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                {/* Input của ô Check In */}
                                                <label>CHECK-IN</label>
                                                <input type="date" name="CheckIn"
                                                    {...register('CheckIn')}
                                                    className="checkinday form-control  bg-light"
                                                />
                                                {errors.CheckIn?.message && <p className="text-danger">{errors.CheckIn.message}</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">

                                                {/* Input của checkout -------- */}
                                                <label>CHECK-OUT</label>
                                                <input type="date" name="CheckOut"
                                                    className="checkoutday form-control bg-light"
                                                    {...register('CheckOut')}
                                                />
                                                {errors.CheckOut?.message && <p className="text-danger">{errors.CheckOut.message}</p>}
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
