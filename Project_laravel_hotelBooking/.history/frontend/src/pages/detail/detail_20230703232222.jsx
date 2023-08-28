import React, { useEffect, useState } from "react";
import '../../css/roomDetail.css'
import 'bootstrap'
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import { getRooms } from "../../services/home";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import Checkout from "../checkout/Checkout";
import Services from "./services";

function Detail() {
  const { id } = useParams();
  const [data, setData] = useState(false);
  const [roomrelevant, setRoomrelevant] = useState(null);
  // const fetchRoom = async () => {
  //   await axios.get(`http://localhost:8000/api/getOne-room-and-images/${id}`)
  //     .then(
  //       (res) => {
  //         console.log("fist data of room detail:", res.data);
  //         if (res.data) {
  //           const object = res.data.find((e) => e);
  //           setData(object);
  //         }
  //       }
  //     )
  //     .catch(errors => console.log(errors))
  // }
  // const fetchAllRoom = () => {
  //   getRooms().then(
  //     res => {
  //       const reRoom = res.filter(
  //         (e, index) => {
  //           if (
  //             e.star === data.star ||
  //             e.price === data.price ||
  //             e.name.includes(data.name)
  //           ) {
  //             return e
  //           }
  //         }
  //       )
  //       setRoomrelevant(reRoom);
  //     }
  //   )
  // }

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
  // useEffect(() => {
  //   if (!data) {
  //     fetchRoom();
  //   }
  //   if (data && !roomrelevant) {
  //     fetchAllRoom();

  //   }
  //   console.log("room relevant:", roomrelevant)
  // }, [data, roomrelevant]);
  return (
    <>
      <div className="container-fluid">
        <div className="d-flex">
          <Link className="text-left" to={'/'}><ArrowBackIcon /></Link> <br />
          <hr />
        </div>
        <div className="row">
          <div className="col-md-6">

            <div className="col-md-6">
              <img
                src={'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'}
              />
              <div className="d-text">
                <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi magnam ut placeat dolor eum totam,
                  facilis quis illum esse itaque amet autem iure, architecto odio. Quia doloremque dolore nisi perferendis.
                </h3>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="d-lg-inline-flex">
                <Card style={{ width: '100%' }}>
                  <Card.Img variant="top" src={'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'} />
                  <Card.Body>
                    <div className="star-name"
                    >
                      <Card.Title>Aperiam autem vel at voluptatum numquam dolores tempore natus distinctio sed illo! </Card.Title>
                      <Card.Text>
                        {/* {Start(e.star)} */}
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
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
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    </Card.Text>

                    <Card.Text>
                      5000$
                    </Card.Text>
                  </Card.Body>
                  <Card.Body>
                    <Card.Link>Card Link</Card.Link>
                    {/* href={`/detail/${e.id}`}  */}
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body>
                </Card>
              </div>

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