import React, { useEffect, useState } from 'react'
// import { RommServices } from '../../services/home'

function Services(props) {
  const [data, setData] = useState(props.data);
  // const fetch = () => {
  //   RommServices(props.id).then(
  //     res => setData(res)
  //   )
  // }
  // useEffect(() => {
  //   if (!data) {
  //     fetch();
  //   }
  // }, [data]);
  return (
    <>
      {data ?
        data.map(
          (res) => (
            <li key={res.id}>{res.name}</li>
          )
        ) : <
        
      }
    </>

  )
}

export default Services
