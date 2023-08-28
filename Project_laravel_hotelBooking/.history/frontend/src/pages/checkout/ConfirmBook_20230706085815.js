import React from 'react'

function ConfirmBook() {
    sessionStorage.getItem('dataBook')
    const [dataBook, setDataBook] = useState(JSON.parse(sessionStorage.getItem('dataBook')));



    return (
        <div>

        </div>
    )
}

export default ConfirmBook
