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
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


function Detail() {
  const { id } = useParams();
  const [data, setData] = useState(false);
  // const [roomrelevant, setRoomrelevant] = useState(null);
  // hàm này dùng để chúng ta lấy một room và tất cả các ảnh của room đó.
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
  // const Start = (star) => {
  //   const arraystar = [];
  //   for (let index = 0; index < 5; index++) {
  //     if (star > index)
  //       arraystar.push(...arraystar, <StarIcon />)
  //     else {
  //       arraystar.push(...arraystar, <StarOutlineIcon />)
  //     }
  //   }
  //   return arraystar;
  // }

  // console.log("chieu dai ",data.image_path.length);
  useEffect(() => {

    if (!data) {
      fetchRoom();
    }
    // if (data && !roomrelevant) {
    //   fetchAllRoom();

    // }
    console.log("in detail page get services:", data.services)
  }, [data]);


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
              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
              >
                {
                  data ?
                    data.img_path || null ?
                      data.img_path.map(e =>
                      (
                        <img key={e.id} src={e.img_path} alt='anh nen' />
                      )
                      )
                      :
                      <img src={'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg'} alt="anh" />
                    : <h5>have no data</h5>
                }
              </Slider>
              {/* <div>
                   <img src={img_path} alt="" /> 
                </div> */}
              <div className="h-25 p-3 d-text">
                <div className="d-sm-flex flex-row justify-content-start">
                  <div className="black-border rounded b-black">5.0</div>
                  <div className="black-border rounded  border-warning  hover-shadow">Perfect</div>
                  <div className="black-border rounded  border-primary">Top Value</div>
                  <div className="black-border rounded  border-primary">Vip room</div>
                  <div className="black-border rounded  border-primary">Top Value</div>
                  <div className="d-flex flex-row align-items-center">
                    <StarIcon style={{ color: 'yellow' }} />
                    <StarIcon style={{ color: 'yellow' }} />
                    <StarIcon style={{ color: 'yellow' }} />
                    <StarIcon style={{ color: 'yellow' }} />
                    <StarIcon style={{ color: 'yellow' }} />

                  </div>
                </div>
                <h3>{data.name} </h3>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="d-inline-sm-flex">
              {data && <Checkout id={id} services={data.services} />}

            </div>
          </div>
        </div>
        <hr style={{ margin: "10px" }} />

        <div className="row">
          <div className="col-md-4 my-3">
            <h5 className="title">Services</h5>
            {
              data && <Services services={data.services} />
            }

          </div>
          <div className="col-md-2 my-3">
            <h5 className="title">Price</h5>
            <h6>${data.price}</h6>

          </div>
          <div className="col-md-2 my-3">
            <h5 className="title">Type room</h5>
            <h6>{data && data.category_name && data.category_name.name}</h6>
          </div>
          <div className="col-md-4 my-3">
            <h5 className="title">Comments</h5>
          </div>
        </div>
        <div className="row">
          
        </div>
      </div>
    </>
  );
}
export default Detail;