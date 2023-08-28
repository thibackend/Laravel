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
            <div className='card d-flex justify-content-evenly'>
                <h5 className='black-border w-10 h-25'> box 1</h5>
                <h5 className='black-border w-25 h-25'> box 2</h5>
                <h5 className='black-border w-25 h-25'> box 3</h5>
                <h5 className='black-border w-25 h-25'> box 4</h5>
                <h5 className='black-border w-25 h-25'> box 5</h5>
            </div>
            <div className='card'>
                <div className='row d-flex justify-content-between aligin-items-center my-2 p-2'>
                    <div className='col-md-7 black-border card'>
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
