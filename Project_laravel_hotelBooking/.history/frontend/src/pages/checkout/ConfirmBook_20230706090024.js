import React, { useEffect, useState } from 'react'

function ConfirmBook() {
    const dataBook0 = JSON.parse(sessionStorage.getItem('dataBook'));
    const [dataBook, setDataBook] = useState(null);

    useEffect(
        () => {
            if(!data)
        }, [dataBook]);
    return (
        <div>

        </div>
    )
}

export default ConfirmBook
