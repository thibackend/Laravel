import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Checkout from './Checkout';

function ConfirmBook() {
    // khởi gáng các biến dữ liệu cho trang.
    const dataBook0 = JSON.parse(sessionStorage.getItem('dataBook'));
    const [dataBook, setDataBook] = useState(null);

    const configData = () =>{
        setDataBook( prevData =>({
            ...prevData,CheckIn:7,
        }))
    }



    useEffect(
        () => {
            if (!dataBook) {
                setDataBook(dataBook0);
            }
            if(dataBook){
                // const CheckIn = moment(dataBook.CheckIn) || null;
                console.log('dataBook', dataBook);
            }
        }, [dataBook]);

    return (
        <div className='container'>
            <div className='row d-flex justify-content-between aligin-items-center my-2 p-2'>
                <div className='col-md-7 black-border card'>
                    <div className='row'>
                        <h3 className='text-secondary'>Payment method</h3>
                        <div className='d-flex justify-content-between'>
                            <div className='card align-items-center' onClick={()=>alert("ban da chon thanh toan bằng card")}>
                                <div className='card-body'>
                                    <img className='w-10' src='https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/credit_cards.png' alt='cards' />
                                </div>
                                <p className='card-text'>
                                    Card
                                </p>
                            </div>
                            <div className='card align-items-center'>
                                <div className='card-body'>
                                    <img className='w-10' src='https://cdn.icon-icons.com/icons2/2699/PNG/512/paypal_logo_icon_170865.png' alt='cards' />
                                </div>
                                <p className='card-text'>
                                    PayPal
                                </p>
                            </div>
                            <div className='card align-items-center'>
                                <div className='card-body'>
                                    <img className='w-10' src='https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png' alt='cards' />
                                </div>
                                <p className='card-text'>
                                    Momo
                                </p>
                            </div>
                            <div className='card align-items-center'>
                                <div className='card-body'>
                                    <img className='w-10' src='https://vnpay.vn/s1/statics.vnpay.vn/2023/6/0oxhzjmxbksr1686814746087.png' alt='cards' />
                                </div>
                                <p className='card-text'>
                                    VnPay
                                </p>
                            </div>
                            <div className='card align-items-center'>
                                <div className='card-body'>
                                    <img className='w-10' src='https://png.pngtree.com/png-vector/20191028/ourmid/pngtree-cash-in-hand-icon-cartoon-style-png-image_1896492.jpg' alt='cards' />
                                </div>
                                <p className='card-text'>
                                    Tiền mặt
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className='row mt-5'>
                        <div className='col-md-12 col-sm-6'>
                            <div className='row'>
                                <div className='col-md-7'>
                                    <label htmlFor='cardNumber'>
                                        <p className='text-secondary'>Card Numer</p>
                                        <input type='number' className='form-control' placeholder='0000 / 0000 / 000' />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ben này dùng để lưu các thông tin của dặt phòng*/}
                <div className='col-md-4 card'>
                    <h3 className='text-secondary mt-3'>Invoice</h3>
                    <div className='container'>
                        <p className='card-text'>total price: 200$ </p>
                        <p className='card-text'>: 200$ </p>
                        <p className='card-text'>total price: 200$ </p>
                        <p className='card-text'>total price: 200$ </p>
                        <p className='card-text'>total price: 200$ </p>
                        <p className='card-text'>total price: 200$ </p>

                        <p className='card-text'>total price: 200$ </p>
                        <div className='row card-text '>
                            <div className='col-12 text-align-center'>
                                <p>Schedual</p>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        Check In
                                        <div className='text-seconary'>
                                        {/* {dataBook && CheckIn && CheckIn.format('YYYY-MM-DD')} */}
                                        </div>
                                        <hr />
                                    </div>
                                    <div className='col-md-6'>
                                        Check Out
                                        <div className='text-seconary'>
                                            {/* {dataBook && CheckOut && Checkout.format('YYYY-MM-DD')} */}
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default ConfirmBook
