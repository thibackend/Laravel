import React, { useEffect, useState } from "react";
import '../../css/roomDetail.css'
import 'bootstrap'
import axios from 'axios';
// import { register } from 'swiper/element/bundle';
// register Swiper custom elements
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import { getRooms } from "../../services/home";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import Checkout from "../checkout/Checkout";
import Services from "./services";

function Detail() {
  // register();
  const { id } = useParams();
  const [data, setData] = useState(false);
  const [roomrelevant, setRoomrelevant] = useState(null);
  const fetchRoom = async () => {
    await axios.get(`http://localhost:8000/api/getOne-room-and-images/${id}`)
      .then(
        (res) => {
          console.log("fist data of room detail:", res.data);
          if (res.data) {
            const object = res.data.find((e) => e);
            setData(object);
          }
        }
      )
      .catch(errors => console.log(errors))
  }
  const fetchAllRoom = () => {
    getRooms().then(
      res => {
        const reRoom = res.filter(
          (e, index) => {
            if (
              e.star === data.star ||
              e.price === data.price ||
              e.name.includes(data.name)
            ) {
              return e
            }
          }
        )
        setRoomrelevant(reRoom);
      }
    )
  }

  // start 5      index<5 
  // index 1 
  const Start = (star) => {
    const arraystar = [];
    for (let index = 0; index < 5; index++) {
      if (star > index)
        arraystar.push(...arraystar, <StarIcon />)
      else {
        arraystar.push(...arraystar, <StarOutlineIcon />)
      }
    }
    return arraystar;
  }

  // console.log("chieu dai ",data.image_path.length);
  useEffect(() => {
    if (!data) {
      fetchRoom();
    }
    if (data && !roomrelevant) {
      fetchAllRoom();

    }
    console.log("room relevant:", roomrelevant)
  }, [data, roomrelevant]);
  return (
    <>
      <div className="container">
        <div className="back-icon">
          <Link className="btn btn-danger" to={'/'}><ArrowBackIcon /></Link> <br />
          <hr />
          <div className="name-and-relevant-room">
            <div className="name-slide shadow-sm">
              <swiper-container
                autoplay="true"
                delay="500"
                loop='true'
              >
                <swiper-slide className='slide-name-item'>
                  <h1 style={{ fontSize: 30 }}>{data ? data.name.toUpperCase() : ''}</h1>
                </swiper-slide>
                <swiper-slide className='slide-item'>
                  <h1 style={{ fontSize: 30 }}>{data ? data.name.toUpperCase() : ''}</h1>
                </swiper-slide>
              </swiper-container>
            </div>
            <h1 className="title-relevant-room">RELEVANT ROOMS</h1>
          </div>

          <hr />
        </div>
        <div className="frame-slide-relevant-room">
          <div className="slide">
            <swiper-container // vì là một component của một thư viện khác nên sẽ có tên className riêng của nó.  .swiper-backface-hidden swiper-slide
              slides-per-view="1"
              autoplay="true" loop='true'>
              {data ? // if 0
                data.image_path.length === 1 ? //if 1
                  (
                    // console.log('data image  if -- 1:', data.image_path)
                    <swiper-slide className='slide-item'>
                      <img
                        src={data.image_path[0]}
                      />
                      <div className="slide-caption">
                        <h3>{data.desc}</h3>
                      </div>
                    </swiper-slide>
                  )
                  : //else 1
                  data.image_path.length > 1
                    ? //if 2
                    data.image_path.map(
                      (e, index) => (
                        <swiper-slide
                          key={index}
                          className='slide-item'>
                          <img
                            src={e}
                          />
                          <div className="slide-caption">
                            <h3>{data.desc}</h3>
                          </div>
                        </swiper-slide>
                      )
                    )
                    : //else 2
                    <swiper-slide className='slide-item'>
                      <img
                        src={'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'}
                      />
                      <div className="slide-caption">
                        <h3>THERE ARE NO IMAGE FOR THIS ROOM!</h3>
                      </div>
                    </swiper-slide >

                : //else 0
                <h1>DON'T HAVE DATA HERE!</h1>
              }
            </swiper-container>

          </div>
          <div className="relevant-room">
            <div className="scroll-bar my-1 mx-2">
              {
                roomrelevant ?
                  <swiper-container
                    loop="true"
                    autoplay="true" delay="0.5"
                    style={{ display: 'flex', flexDirection: 'column-reverse' }}
                  >
                    {roomrelevant.map(
                      (e, index) => (

                        <swiper-slide key={index}>
                          <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src={e.image_path[0] ? e.image_path[0] : 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'} />
                            <Card.Body>
                              <div className="star-name"
                                style={{ display: 'flex', justifyContent: 'space-between' }}
                              >
                                <Card.Title>{e.name}</Card.Title>
                                <Card.Text>
                                  {Start(e.star)}
                                </Card.Text>
                              </div>

                              <Card.Text
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  maxWidth: "200px",
                                }}
                              >
                                {e.desc}
                              </Card.Text>

                              <Card.Text>
                                {e.price}$
                              </Card.Text>
                            </Card.Body>
                            <Card.Body>
                              <Card.Link href={`/detail/${e.id}`}>Card Link</Card.Link>
                              <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                          </Card>
                        </swiper-slide>
                      )
                    )
                    }

                  </swiper-container>
                  :
                  <h1>Have no room like this room</h1>
              }
            </div>
          </div>
        </div>

      </div>
      <hr style={{ margin: "10px" }} />
      <div className="service-price-typeroom">
        <div className="services">
          <h1 className="title">SERVICES</h1>
          <ul className="service-item">
            <Services id={id} />
          </ul>
          <div className="service-item">

          </div>
        </div>
        <div className="price">
          <h1 className="title">PRICE</h1>
          <h3>${data.price}  / Day</h3>
        </div>
        <div className="typeroom">
          <h1 className="title">TYPE ROOM</h1>
          <div className="h3">
            {data ? data.category_name.name : <del> NONE</del>}
          </div>
        </div>
        <div className="form-booking">
          <Checkout id={id} />
        </div>
      </div>
    </>
  );
}
export default Detail;