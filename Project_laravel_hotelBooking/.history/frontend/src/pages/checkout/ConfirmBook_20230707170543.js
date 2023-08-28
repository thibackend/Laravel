import React, { useEffect, useState } from 'react';
import '../../css/confirmBooking.css';
import moment from 'moment';
import { SelectAllServices } from '../../services/home/Serices';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { postDatabooking } from '../../services/home/bills';

function ConfirmBook() {
    // khởi gáng các biến dữ liệu cho trang.
    const dataBook0 = JSON.parse(sessionStorage.getItem('dataBook'));
    const [dataBook, setDataBook] = useState(false);
    const [config, setConfig] = useState(false);
    const [services, setServices] = useState(null);
    const [total, setTotal] = useState(null);
    const [paymentMethod, setpaymentMethod] = useState();
    // const [totalServices, setTotalServices] = useState(null);
    const [Paymentmethods, setPaymentMethods] = useState(
        {
            card: false,
            momo: false,
            paypal: false,
            vnpay: false,
            cash: true
        }
    );

    const postBookBill = (data) => {
        postDatabooking(data).then(
            (res) => {
                console.log('res data post: ', res);
            }
        ).catch((err) => console.log('Eroo', err))
    }

    const handleConfirm = () => {
        setMethod();
        const dataPost = {
            total_price: total,
            paymentMethod: paymentMethod,
            services: services,
            total_night: dataBook.night,
            room_rate: dataBook.price,
            CheckIn: dataBook.CheckIn,
            CheckOut: dataBook.CheckOut
        }
        postBookBill(dataPost);
    }

    const setMethod = () => {
        if (Paymentmethods.cash) { return setpaymentMethod("Cash"); }
        if (Paymentmethods.card) { return setpaymentMethod("Card"); }
        if (Paymentmethods.vnpay) { return setpaymentMethod("VnPay"); }
        if (Paymentmethods.paypal) { return setpaymentMethod("PayPal"); }
        if (Paymentmethods.momo) { return setpaymentMethod("MoMo"); }
    }
    // thông báo payment method chưa hoàn thiện.
    const alerts = () => {
        alerts('Phương thức thanh toán này chưa hoàn thiện');
        setInterval(() =>
            setPaymentMethods(prevPaymentMethod => ({
                ...prevPaymentMethod,
                card: false,
                momo: false,
                paypal: false,
                vnpay: false,
                cash: "Thanh toán bằng tiền mặt"
            }))
            , 1000)
    }
    // fortmat cho số tiền.
    const fortmatMoney = (money) => {
        const formattedPrice = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(money);
        return formattedPrice;
    }

    const handleChangeMethod = (data) => {
        switch (data) {
            case 'card':
                setPaymentMethods(prevPaymentMethod => ({
                    ...prevPaymentMethod,
                    card: "thanh toán bằng thẻ tín dụng",
                    momo: false,
                    paypal: false,
                    vnpay: false,
                    cash: false
                }));

                break;
            case 'momo': setPaymentMethods(prevPaymentMethod => ({
                ...prevPaymentMethod,
                card: false,
                momo: "thanh toán bằng MOMO",
                paypal: false,
                vnpay: false,
                cash: false
            }));

                break;
            case 'paypal': setPaymentMethods(prevPaymentMethod => ({
                ...prevPaymentMethod,
                card: false,
                momo: false,
                paypal: "thanh toán bằng Paypal",
                vnpay: false,
                cash: false
            }));

                break;
            case 'vnpay': setPaymentMethods(prevPaymentMethod => ({
                ...prevPaymentMethod,
                card: false,
                momo: false,
                paypal: false,
                vnpay: "thanh toán bằng VnPay",
                cash: false
            }));

                break;
            case 'cash': setPaymentMethods(prevPaymentMethod => ({
                ...prevPaymentMethod,
                card: false,
                momo: false,
                paypal: false,
                vnpay: false,
                cash: "Thanh toán bằng tiền mặt"
            }));

                break;
            default:
                break;
        }
    }
    const fetchServices = async (serciesIDs) => {
        SelectAllServices(serciesIDs)
            .then(
                res => {
                    console.log('res', res);
                    setServices(res);
                }
            )
            .catch(err => console.log(err))
    }

    const configData = () => {
        setTotal(0)
        setDataBook(prevData => ({
            ...prevData, CheckIn: moment(dataBook.CheckIn).format('YYYY-MM-DD'),
        }))
        setDataBook(prevData => ({
            ...prevData, CheckOut: moment(dataBook.CheckOut).format('YYYY-MM-DD'),
        }))
        services.map(
            (ser) => {
                if (!total) {
                    setTotal(ser.price);
                } else { setTotal(prevTotal => prevTotal + ser.price); }
            }
        )
        setTotal(prevTotal => prevTotal + (dataBook.night * dataBook.price));
    }
    useEffect(
        () => {
            if (!dataBook) {
                setDataBook(dataBook0);
                setConfig(true);
            }
            if (!services) fetchServices(dataBook.services);
            if (config && services) {
                configData();
            }
            setMethod();
        }, [config, services, paymentMethod]);

    return (
        <div className='container'>
            <div className='btn btn-outline-secondary' onClick={(e) => { e.preventDefault(); window.history.back() }}><ArrowBackIcon /></div>
            <div className='row d-flex justify-content-between aligin-items-center my-2 p-2'>
                <div className='col-md-6 card mx-1'>
                    <div className='row'>
                        {/* show ra các payment method */}
                        <h3 className='text-secondary'>Payment method</h3>
                        <div className='d-flex justify-content-between'>
                            <div className={`opacity-25 card align-items-center method ${Paymentmethods.card ? 'selected' : ''} `} onClick={() => alert("Method in progress unable to use")}>
                                {/* onClick={() => handleChangeMethod('card')} */}
                                <div className='card-body'>
                                    <img className='w-10' src='https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/credit_cards.png' alt='cards' />
                                </div>
                                <p className='card-text'>
                                    Card
                                </p>
                            </div>
                            <div className={`opacity-25 card align-items-center method ${Paymentmethods.paypal ? 'selected' : ''} `} onClick={() => alert("Method in progress unable to use")}>
                                <div className='card-body'>
                                    <img className='w-10' src='https://cdn.icon-icons.com/icons2/2699/PNG/512/paypal_logo_icon_170865.png' alt='cards' />
                                </div>
                                <p className='card-text'>
                                    PayPal
                                </p>
                            </div>
                            <div className={`opacity-25 card align-items-center method ${Paymentmethods.momo ? 'selected' : ''} `} onClick={() => alert("Method in progress unable to use")}>
                                <div className='card-body'>
                                    <img className='w-10' src='https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png' alt='cards' />
                                </div>
                                <p className='card-text'>
                                    Momo
                                </p>
                            </div>
                            <div className={`opacity-25 card align-items-center method ${Paymentmethods.vnpay ? 'selected' : ''} `} onClick={() => alert("Method in progress unable to use")}>
                                <div className='card-body'>

                                    <img className='w-10' src='https://vnpay.vn/s1/statics.vnpay.vn/2023/6/0oxhzjmxbksr1686814746087.png' alt='cards' />
                                </div>
                                <p className='card-text'>
                                    VnPay
                                </p>
                            </div>
                            <div className={`card align-items-center method ${Paymentmethods.cash ? 'selected' : ''} `} onClick={() => handleChangeMethod('cash')}>
                                <div className='card-body'>
                                    {/* {Paymentmethods.cash && setpaymentMethod("Cash")} */}
                                    <img className='w-10' src='https://png.pngtree.com/png-vector/20191028/ourmid/pngtree-cash-in-hand-icon-cartoon-style-png-image_1896492.jpg' alt='cards' />
                                </div>
                                <p className='card-text'>
                                    Cash
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* chọn method nào thì phưng thức thanh toán đó sẽ hiện ra*/}
                    <div className='row mt-5'>
                        <div className='col-md-12 col-sm-6'>
                            <div className='row'>
                                {Paymentmethods.card &&
                                    <div className='col-md-7'>
                                        <label htmlFor='cardNumber'>
                                            <p className='text-secondary'>Card Numer</p>
                                            <input type='number' className='form-control' placeholder='0000 / 0000 / 000' />
                                        </label>
                                        <hr />
                                    </div>
                                }

                                {Paymentmethods.momo &&
                                    <div className='col-md-7'>
                                        <label htmlFor='cardNumber'>
                                            <p className='text-secondary'>Thanh toan bang MOMO</p>
                                            <input type='number' className='form-control' placeholder='0000 / 0000 / 000' />
                                        </label>
                                    </div>
                                }

                                {Paymentmethods.paypal &&
                                    <div className='col-md-7'>
                                        <label htmlFor='cardNumber'>
                                            <p className='text-secondary'>Thanh toan bang paypal</p>
                                            <input type='number' className='form-control' placeholder='0000 / 0000 / 000' />
                                        </label>
                                    </div>
                                }

                                {Paymentmethods.vnpay &&
                                    <div className='col-md-7'>
                                        <label htmlFor='cardNumber'>
                                            <p className='text-secondary'>Thanh toan bang vnpay</p>
                                            <input type='number' className='form-control' placeholder='0000 / 0000 / 000' />
                                        </label>
                                    </div>
                                }

                                {Paymentmethods.cash &&
                                    <div className='col-md-7'>
                                        <label htmlFor='cardNumber'>
                                            <p className='text-secondary'>Thanh toan bang tien mat</p>
                                            <input type='number' className='form-control' placeholder='0000 / 0000 / 000' />
                                        </label>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                    <div className='card-footer d-inline-flex justify-content-end'>
                        <button className='danger-border btn btn-outline-danger mx-2'>Close</button>
                        <button className='danger-border btn btn-outline-success' onClick={handleConfirm}> Confirm</button>
                    </div>
                </div>
                {/* ben này dùng để lưu các thông tin của dặt phòng*/}
                <div className='col-md-5 card inline'>
                    <h3 className='text-secondary mt-3'>Bill</h3>
                    <div className='container'>
                        <p className='card-text text-secondary'>Room rate: {dataBook && fortmatMoney(dataBook.price)}$ </p>
                        <p className='card-text text-secondary'>Total night: {dataBook && dataBook.night} </p>
                        <p className='card-text text-secondary'>Amount people: {dataBook && dataBook.amountPeople} </p>
                        <p className='row'>
                            <p className='col-12'>SERVICES({dataBook && dataBook.services.length}) <hr /></p>
                            <p className='col-12'>
                                <p className='row'>
                                    {/* lấy services đã chọn bỏ vào đây */}
                                    {
                                        services && services.length ?
                                            services.map(
                                                service => (<div className='col-12 text-secondary'> {service.name} __ {fortmatMoney(service.price)}$</div>)
                                            )
                                            : <h5> there is no services</h5>
                                    }
                                </p>
                            </p>
                        </p>
                        <div className='row card-text '>
                            <div className='col-12 text-align-center'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        CHECK IN DAY
                                        <div className='text-seconary mt-2'>
                                            {dataBook && dataBook.CheckIn}
                                        </div>
                                        <hr />
                                    </div>
                                    <div className='col-md-6'>
                                        CHECK OUT DAY
                                        <div className='text-seconary mt-2'>
                                            {dataBook && dataBook.CheckOut}
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12 d-flex justify-content-end'>
                                <p className='card-text my-3'>Total: {fortmatMoney(total)}$ </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default ConfirmBook
