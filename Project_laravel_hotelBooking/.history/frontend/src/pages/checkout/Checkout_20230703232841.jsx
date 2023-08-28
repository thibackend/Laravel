import React, { useState, useEffect } from "react";
import '../../css/roomDetail.css';
import { RommServices } from "../../services/home";
const Checkout = ({ id }) => {
    const [services, setServices] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);
    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const checked = event.target.checked;
        // Nếu ô checkbox được chọn, thêm giá trị vào mảng
        // Nếu ô checkbox bị bỏ chọn, loại bỏ giá trị khỏi mảng
        if (checked) {
            setSelectedServices([...selectedServices, value]);
        } else {
            setSelectedServices(selectedServices.filter((service) => service !== value));
        }
    };
    const fetch = () => {
        RommServices(id).then(
            res => setServices(res)
        )
    }
    useEffect(() => {
        if (!services) {
            fetch();
        }
        console.log("services in checkout :", services);
    }, [services]);
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4>BOOKING NOW!</h4>
                    </div>
                    <form>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>CHECK-IN-DAY</label>
                                                {/* onChange={handleInput} value={checkoutInput.firstname}  */}
                                                <input type="date" name="checkin_day" className="checkinday form-control  bg-light" />
                                                {/* <small className="text-danger">{error.firstname}</small> */}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>CHECK-OUT-DAY</label>
                                                {/* onChange={handleInput} value={checkoutInput.firstname}  */}
                                                <input type="date" name="checkout_day" className="checkoutday form-control  bg-light" />
                                                {/* <small className="text-danger">{error.firstname}</small> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">

                                        <div className="col-12">
                                            <div className="row">
                                                {services ?
                                                    services.services.map(
                                                        (e, i) => (
                                                            <div className="col-sm-6">
                                                                <label htmlFor="service">
                                                                    <input
                                                                        type="checkbox"
                                                                        name="services"
                                                                        value={e.id}
                                                                        id="service"
                                                                        onChange={handleCheckboxChange}
                                                                    />
                                                                    {e.name}
                                                                </label>
                                                            </div>
                                                        )
                                                    )

                                                    :
                                                    ""}

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group text-end">
                                            {/* onClick={(e) => submitOrder(e, 'cod')} */}
                                            {/* onClick={(e) => submitOrder(e, 'razorpay')} */}
                                            {/* onClick={(e) => submitOrder(e, 'payonline')} */}

                                            <button
                                                type="submit" className="nutdat dir dir-ltr">BOOK</button>
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
