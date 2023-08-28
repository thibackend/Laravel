import React, { useEffect, useState } from 'react'
// import { RommServices } from '../../services/home'

function Services(props) {
  const [data, setData] = useState(null);
  // const fetch = () => {
  //   RommServices(props.id).then(
  //     res => setData(res)
  //   )
  // }
  useEffect(() => {
    setData()
  }, [data]);
  return (
    <>
      {data ?
        data.map(
          (res) => (
            <li key={res.id}>{res.name}</li>
          )
        ) : <h4> there is no service</h4>

      }
    </>

  )
}

export default Services
