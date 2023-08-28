import React, { useEffect, useState } from 'react'

function ConfirmBook() {
    const dataBook0 = JSON.parse(sessionStorage.getItem('dataBook'));
    const [dataBook, setDataBook] = useState(null);

    useEffect
        (() => {

        }, []);
    return (
        <div>

        </div>
    )
}

export default ConfirmBook
