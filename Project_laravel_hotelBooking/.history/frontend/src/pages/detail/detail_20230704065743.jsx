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
          <div className="col-lg-8 col-sm-12">
            <div className="col-sm-12">
              <img src="https://hc.com.vn/i/ecommerce/media/GS.009873_FEATURE_122334.jpg" alt="anh tuuongt truong" />
              <div className="d-text">
                <div className="d-sm-flex flex-row justify-content-start">
                  <div className="black-border rounded  border-primary">5.0</div>
                  <div className="black-border rounded  border-warning">Perfect</div>
                  <div className="black-border rounded  border-primary">Top Value</div>
                  <div className="d-flex flex-row align-items-center">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                  </div>
                </div>
                <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </h3>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="d-inline-sm-flex">
              <Checkout id={id} />
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

      </div>
    </>
  );
}
export default Detail;