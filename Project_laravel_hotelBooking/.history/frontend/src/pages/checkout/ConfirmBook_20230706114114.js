import React, { useEffect, useState } from 'react';
function ConfirmBook() {
    const dataBook0 = JSON.parse(sessionStorage.getItem('dataBook'));
    const [dataBook, setDataBook] = useState(null);
    useEffect(
        () => {
            if (!dataBook) {
                setDataBook(dataBook0);
            }
        }, [dataBook]);
    console.log("data booking: ", dataBook);
    return (
        <div className='container'>
            <div className='row d-flex justify-content-between aligin-items-center my-2 p-2'>
                <div className='col-md-7 black-border card'>
                    <div className='row'>
                        <h3 className='text-secondary'>Payment method</h3>
                        <div className='d-flex justify-content-between'>
                            <div className='card align-items-center'>
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

                    <div className='row'>
                        <div className='col-md-12 col-sm-6'>
                            <div className='row'>
                                <div className='col-md-7'>
                                    <label htmlFor='cardNumber'>
                                        <input type='number form-control' />
                                        <p className='text-secondary'>Card Numer</p>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 card'>
                    <h3 className='text-secondary mt-3'>Invoice</h3>
                    <p className='card-text'>total price: 200$ </p>
                    <p className='card-text'>: 200$ </p>
                    <p className='card-text'>total price: 200$ </p>
                    <p className='card-text'>total price: 200$ </p>
                    <p className='card-text'>total price: 200$ </p>
                    <p className='card-text'>total price: 200$ </p>
                    <p className='card-text'>total price: 200$ </p>
                    <p className='card-text'>total price: 200$ </p>
                </div>
            </div>
        </div>

    )
}

export default ConfirmBook
