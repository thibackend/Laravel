import React, { useEffect, useState } from 'react'
import { RommServices } from '../../services/home'

function Services(props) {
  const [data, setData] = useState(null);

  const fetch = () => {
    RommServices(props.id).then(
      res => setData(res)
    )
  }
  useEffect(() => {
    if (!data) {
      fetch();
    }
  }, [data]);
  return (
    <>
      {data ?
        data.services ? data.services.map(
          (res) => (
            <li key={res.id}>{res.name}</li>
          )
        ) : ""
        :
        <h1>Have no services</h1>
      }
    </>

  )
}

export default Services
