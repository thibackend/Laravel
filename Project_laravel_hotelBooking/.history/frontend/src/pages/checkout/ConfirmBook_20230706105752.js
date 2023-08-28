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
            <div className='card'>
                <div className='row d-flex justify-content-between aligin-items-center my-2 p-2'>
                    <div className='col-md-7 black-border card'>
                        <div className='row border'>
                            <h2 className='text-secondary'>Payment method</h2>
                            <div className='d-flex justify-content-start'>
                                <h5 className='black-border rounded'>Cards</h5>
                                <h5 className='black-border rounded'>PayPal</h5>
                                <h5 className='black-border rounded'>Momo</h5>
                                <h5 className='black-border rounded'>VnPay</h5>
                            </div>

                        </div>
                    </div>
                    <div className='col-md-4 black-border'>
                        <h1> THIS IS Bill</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmBook
