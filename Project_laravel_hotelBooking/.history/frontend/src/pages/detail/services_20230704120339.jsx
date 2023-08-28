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
    if (!data) setData(props.services);
    console.log("in services get services:", data);
  }, [data]);
  return (
    <>
      {data ?
        data.map(
          (res) => (
            <li key={res.id}>{res.name}</li>
          )
        )
        : <h4> There is no service</h4>

      }
    </>

  )
}

export default Services
