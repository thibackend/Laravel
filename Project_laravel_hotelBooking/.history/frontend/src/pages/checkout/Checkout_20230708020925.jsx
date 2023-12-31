import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../css/roomDetail.css';
import { useNavigate } from "react-router";
const Checkout = (props) => {

    // thực hiện khai báo các state được sữ dụng.
    const [services, setServices] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);
    const navigate = useNavigate();
    // const [total, setTotal] = useState(null);
    // tao schema validate cho data.
    const schema = yup.object().shape({
        CheckIn: yup
            .date()
            .typeError('Phải là kiểu dữ liệu thời gian!')
            .required('Cần nhập trường này!')
            .min(new Date(), 'Trường này nên lớn hơn hoặc bằng hiện tại!'),

        CheckOut: yup
            .date()
            .typeError('Trường này nhập ngày tháng!')
            .required('Cần nhập trường ngày!')
            .min(yup.ref('CheckIn'), 'Ngày trả phải lớn hơn ngày đặt!'),

        amountPeople: yup
            .number('Vui lòng nhập số người.')
            .typeError('Vui lòng nhập số người.')
            .min(1, 'Ít nhất 1 người.')
            .max(4, 'Tối đa 4 người.'),
    });
    // khai báo các chức năng hổ trợ việc validate.
    const {
        register,
        handleSubmit,
        formState: { errors }, // dùng để hiển thị lỗi.
    } = useForm({ resolver: yupResolver(schema) });

    // thực hiện lấy data để xữ lý.
    const handleCheckOut = (data) => {
        // Đổi đơn vị thời gian về số mili giây
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        // Tính số mili giây giữa hai ngày
        const timeDifference = data.CheckOut.getTime() - data.CheckIn.getTime();
        // Tính số ngày
        const numberOfDays = Math.round(timeDifference / millisecondsPerDay);
        data.night = numberOfDays;
        data.price = props.price;
        data.room_id = props.id;

        sessionStorage.setItem("dataBook", JSON.stringify(data));
        setTimeout(() => {
            navigate('/confirm');
        })

    }

    // hàm thực hiện việc tính tổng tiền khi mà chọn ngày và và các dịch vụ xong.
    // hàm này kiểm tra người dùng click chọn bao nhiêu services.
    // const handleCheckboxChange = (event) => {
    //     const value = event.target.value;
    //     const checked = event.target.checked;
    //     if (checked) {
    //         setSelectedServices([...selectedServices, value]);
    //         alert(`Bạn đã chọn dịch vụ: ` + value);
    //     } else {
    //         setSelectedServices(selectedServices.filter((service) => service !== value));
    //         alert('bạn đã bỏ chọn dịch vụ: ' + value);
    //     }
    // };
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
                                                // onChange={handleChangTotal}
                                                />
                                                {errors.CheckIn?.message && <p className="text-danger">{errors.CheckIn.message}</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                {/* Input của checkout -------- */}
                                                <label>CHECK-OUT</label>
                                                <input type="date" name="CheckOut"
                                                    min={new Date()}
                                                    className="checkoutday form-control bg-light"
                                                    {...register('CheckOut')}
                                                // onChange={handleChangTotal}
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
                                                                <input
                                                                    type="checkbox"
                                                                    name="services"
                                                                    // value={e.id}
                                                                    id="services"
                                                                    value={e.id}
                                                                    // onChange={handleCheckboxChange}
                                                                    {...register('services')}
                                                                />
                                                                {e.name}
                                                            </div>
                                                        )
                                                    )
                                                    : ''
                                                }
                                                {errors.services?.message && <p className="text-danger">{errors.services.message}</p>}
                                            </div>
                                            {/* show so luong nguoi */}

                                            <div className="col-md-12 my-3">
                                                <div className="row justify-content-between align-items-center">
                                                    <div className="col-md-7 border-bottom rounded">
                                                        <input type="number"
                                                            {...register('amountPeople')}
                                                            className="form-control border-none"
                                                            name="amountPeople"
                                                            id="amountPeople"
                                                            placeholder="Enter amount people" />
                                                        {errors.amountPeople && <p className="text-danger">{errors.amountPeople.message}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group text-black">
                                            {props.status ?
                                                <button
                                                    type="submit" className="nutdat dir dir-ltr hover-zoom">BOOK
                                                </button>
                                                :
                                                <h6 className="text-danger my-5 mx-2">This room has already been booked.</h6>
                                            }

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
