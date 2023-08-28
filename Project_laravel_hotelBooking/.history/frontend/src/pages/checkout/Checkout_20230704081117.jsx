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
                        <h2>$/night!</h2>
                    </div>
                    <form>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12 black-border">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>CHECK-IN</label>
                                                {/* onChange={handleInput} value={checkoutInput.firstname}  */}
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
                                        <div className="col-md-12 black-border">
                                            {/* show services */}
                                            <div className="row justify-content-between">
                                                {/* {services ?
                                                    services.services.map(
                                                        (e, i) => ( */}
                                                <div class="col-md-6 my-2">
                                                    <label htmlFor="service">
                                                        <input
                                                            type="checkbox"
                                                            name="services"
                                                            // value={e.id}
                                                            id="service"
                                                        // onChange={handleCheckboxChange}
                                                        />
                                                        Serviec cham soc tre nhow
                                                    </label>
                                                </div>
                                                <div class="col-md-6 my-2">
                                                    <label htmlFor="service">
                                                        <input
                                                            type="checkbox"
                                                            name="services"
                                                            // value={e.id}
                                                            id="service"
                                                        // onChange={handleCheckboxChange}
                                                        />
                                                        Serviec cham soc tre nhow
                                                    </label>
                                                </div><div class="col-md-6 my-2">
                                                    <label htmlFor="service">
                                                        <input
                                                            type="checkbox"
                                                            name="services"
                                                            // value={e.id}
                                                            id="service"
                                                        // onChange={handleCheckboxChange}
                                                        />
                                                        Serviec cham soc tre nhow
                                                    </label>
                                                </div><div class="col-md-6 my-2">
                                                    <label htmlFor="service">
                                                        <input
                                                            type="checkbox"
                                                            name="services"
                                                            // value={e.id}
                                                            id="service"
                                                        // onChange={handleCheckboxChange}
                                                        />
                                                        Serviec cham soc tre nhow
                                                    </label>
                                                </div><div class="col-md-6 my-2">
                                                    <label htmlFor="service">
                                                        <input
                                                            type="checkbox"
                                                            name="services"
                                                            // value={e.id}
                                                            id="service"
                                                        // onChange={handleCheckboxChange}
                                                        />
                                                        Serviec cham soc tre nhow
                                                    </label>
                                                </div>



                                                {/* )
                                                    )

                                                    :
                                                    ""} */}

                                            </div>

                                            {/* show so luong nguoi */}
                                            <div className="col-md-12">
                                                <div className="row justify-content-between align-items-center">
                                                    <div className="col-md-6 border-bottom rounded">
                                                        <input type="number" name="people" id="people" placeholder="Enter amount people" max={3} />
                                                    </div>
                                                    <div className="col-md-6 border-bottom rounded">
                                                        <h6 >total: 3000$</h6>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group text-end">
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
