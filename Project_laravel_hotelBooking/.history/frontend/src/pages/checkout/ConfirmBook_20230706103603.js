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
                <div className='row d-flex justify-'>
                    <div className='col-md-7 black-border'>
                        <h1>THIS IS METHOD</h1>
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
