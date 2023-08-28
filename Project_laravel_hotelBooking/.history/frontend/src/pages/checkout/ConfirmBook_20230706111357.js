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
                                    <img className='w-10' src='https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/credit_cards.png' alt='cards' />
                                </div>
                                <p className='card-text'>
                                    Momo
                                </p>
                            </div>
                            <div className='card align-items-center'>
                                <div className='card-body'>
                                    <img className='w-10' src='https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/credit_cards.png' alt='cards' />
                                </div>
                                <p className='card-text'>
                                    VnPay
                                </p>
                            </div>
                            <div className='card align-items-center'>
                                <div className='card-body'>
                                    <img className='w-10' src='https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/credit_cards.png' alt='cards' />
                                </div>
                                <p className='card-text'>
                                    
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='col-md-4 card'>
                    <h1 className='text-secondary'> THIS IS Bill</h1>
                </div>
            </div>
        </div>

    )
}

export default ConfirmBook
