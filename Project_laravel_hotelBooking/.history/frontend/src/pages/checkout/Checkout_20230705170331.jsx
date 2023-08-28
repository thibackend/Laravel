import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../css/roomDetail.css';




const Checkout = (props) => {

    // tao schema validate cho data.
    const schema = yup.object().shape({
        CheckIn: yup
            .date()
            .typeError('Vui lòng nhập ngày đặt!')
            .required('Cần nhập trường này!')
            .min(new Date(), 'Trường này nên lớn hơn hoặc bằng hiện tại!'),

        CheckOut: yup
            .date()
            .typeError('Vui lòng nhập ngày trả!')
            .required('Cần nhập trường ngày!')
            .min(yup.ref('CheckIn'), 'Ngày trả phải lớn hơn ngày đặt!')
            .min(new Date(), 'Trường này nên lớn hơn hoặc bằng hiện tại!'),

        amountPeople: yup
            .number('Vui lòng nhập số người.')
            .typeError('Vui lòng nhập số người.')
            .min(1, 'Ít nhất 1 người.')
            .max(4, 'Tối đa 4 người.'),
    });


    // thực hiện khai báo các state được sữ dụng.
    const [services, setServices] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);

    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [total, setTotal] = useState(null);

    // khai báo các chức năng hổ trợ việc validate.
    const {
        register,
        handleSubmit,
        formState: { errors }, // dùng để hiển thị lỗi.
    } = useForm({ resolver: yupResolver(schema) });

    // thực hiện lấy data để xữ lý.
    const handleCheckOut = (data) => {
        console.log("data check out: ", data);
        const timeDifference = data.CheckOut.getTime() - data.CheckIn.getTime();

        // Tiếp theo, chúng ta chia thời gian đó cho số mili giây trong một ngày (24 giờ * 60 phút * 60 giây * 1000 mili giây)
        const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
        console.log("day:", daysDifference)

    }

    // hàm thực hiện việc tính tổng tiền khi mà chọn ngày và và các dịch vụ xong.
    const handleChangTotal = () => {
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



    const handleCheckInChange = (event) => {
        const dateValue = event.target.value;
        setCheckInDate(dateValue);
    };

    const handleCheckOutChange = (event) => {
        const dateValue = event.target.value;
        setCheckOutDate(dateValue);
    };

    // hàm này dùng để kiểm tra thay đổi của credit khi mà người dùng click vào thì chuyển sang trạng thái true và hiện ô nhập số thẻ
    useEffect(() => {
        if (!services) {
            setServices(props.services)
        }
        console.log("servises: ", services);
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
