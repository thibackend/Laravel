import React from 'react'

function ConfirmBook() {
   cons sessionStorage.getItem('dataBook')
    const [dataBook, setDataBook] = useState(JSON.parse(sessionStorage.getItem('dataBook')));



    return (
        <div>

        </div>
    )
}

export default ConfirmBook
