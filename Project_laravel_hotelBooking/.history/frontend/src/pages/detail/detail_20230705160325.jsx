import React, { useEffect, useState } from "react";
// import '../../css/roomDetail.css'
import 'bootstrap'
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
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
  const [images, setImage] = useState(false);
  const [roomRelevant, setRoomRelevant] = useState(false);

  // hàm này dùng để chúng ta lấy một room và tất cả các ảnh của room đó.
  const fetchRoom = async () => {
    await axios.get(`http://localhost:8000/api/getOne-room-and-images/${id}`)
      .then(
        (res) => {
          if (res.data) {
            const object = res.data.find((e) => e);
            setData(object);
          }
        }
      )
      .catch(errors => console.log(errors))
  }

  // hàm này dùng dể lấy tất cả các room có liên quan tới room hiện tại.
  const fetchAllRoom = () => {
    getRooms().then(
      res => {
        const reRoom = res.filter(
          (e) => {
            if (
              e.name.includes(data.name)
            ) {
              return e
            }
          }
        )
        setRoomRelevant(reRoom);
      }
    ).catch(error => console.log(error))
  }

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
    if (data && data.image_path && !images) {
      setImage(data.image_path);
    }
    if (data && !roomRelevant) {
      fetchAllRoom();
    }
  }, [data, roomRelevant, images]);

  return (
    <>
      <div className="container">
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
                autoplay={true} // Tự động chạy slide
                autoplaySpeed={2000}
              >
                {
                  images ?
                    images.map((e, index) =>
                    (
                      <img key={index} src={`http://127.0.0.1:8000/uploads/images/${e}`} className="w-50" alt='Anh tượng trung' />
                    )
                    )
                    :
                    <img src={'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg'} className="w-75 h-75" alt="anh" />
                }
              </Slider>
              <div className="h-25 p-3 d-text">
                <div className="d-sm-flex flex-row justify-content-start">
                  <div className="black-border rounded b-black">5.0</div>
                  <div className="black-border rounded  border-warning  hover-shadow">Perfect</div>
                  <div className="black-border rounded  border-primary">Top Value</div>
                  <div className="black-border rounded  border-primary">Vip room</div>
                  <div className="black-border rounded  border-primary">Top Value</div>
                  <div className="d-flex flex-row align-items-center mx-3">
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
              {data && <Checkout price={data.price} id={id} services={data.services} />}

            </div>
          </div>
        </div>
        <hr style={{ margin: "10px" }} />
        <h2>Information</h2>

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
        <h2> Phong lien quan</h2>
        <div className="row" style={{ display: 'flex' }}>
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={3}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={0.5}
          >
            {/* {
              roomRelevant ?
                roomRelevant.map(
                  (e) => (
                    <Card style={{ width: '20rem' }} >
                      <Card.Img variant="top" src={e.image_path !== '' ? `http://127.0.0.1:8000/uploads/images/${e.image_path[0]}` : 'https://nystudio107.com/img/blog/_1200x675_crop_center-center_82_line/image_optimzation.jpg'} />
                      <Card.Body>
                        <Card.Title>{e.name}{console.log("phong lien quang :", roomRelevant)} </Card.Title>
                        <Card.Text >
                          <p className="overflow-hidden">{e.desc}</p>
                        </Card.Text>
                        <Button variant="success">detail</Button>
                      </Card.Body>
                    </Card>
                  )
                )
                : <h1>Loading ...</h1>
            } */}
            <Card style={{ width: '20rem' }} >
              {/* e.image_path !== '' ? `http://127.0.0.1:8000/uploads/images/${e.image_path[0]}` : */}
              <Card.Img variant="top" src={'https://nystudio107.com/img/blog/_1200x675_crop_center-center_82_line/image_optimzation.jpg'} />
              <Card.Body>
                {/* {e.name}{console.log("phong lien quang :", roomRelevant)} */}
                <Card.Title>Lorem 30004 chỉ làm những tài liệu để chúng ta có thể tạo văn bản giả</Card.Title>
                <Card.Text >
                  {/* {e.desc} */}
                  <p className="overflow-hidden"> Và đay cung thế tất cả chỉ là những lorm vaen bản tượng trưng.</p>
                </Card.Text>
                <Button variant="success">link</Button>
              </Card.Body>
            </Card>
            <Card style={{ width: '20rem' }} >
              {/* e.image_path !== '' ? `http://127.0.0.1:8000/uploads/images/${e.image_path[0]}` : */}
              <Card.Img variant="top" src={'https://nystudio107.com/img/blog/_1200x675_crop_center-center_82_line/image_optimzation.jpg'} />
              <Card.Body>
                {/* {e.name}{console.log("phong lien quang :", roomRelevant)} */}
                <Card.Title>Lorem 30004 chỉ làm những tài liệu để chúng ta có thể tạo văn bản giả</Card.Title>
                <Card.Text >
                  {/* {e.desc} */}
                  <p className="overflow-hidden"> Và đay cung thế tất cả chỉ là những lorm vaen bản tượng trưng.</p>
                </Card.Text>
                <Button variant="success">link</Button>
              </Card.Body>
            </Card>
            <Card style={{ width: '20rem' }} >
              {/* e.image_path !== '' ? `http://127.0.0.1:8000/uploads/images/${e.image_path[0]}` : */}
              <Card.Img variant="top" src={'https://nystudio107.com/img/blog/_1200x675_crop_center-center_82_line/image_optimzation.jpg'} />
              <Card.Body>
                {/* {e.name}{console.log("phong lien quang :", roomRelevant)} */}
                <Card.Title>Lorem 30004 chỉ làm những tài liệu để chúng ta có thể tạo văn bản giả</Card.Title>
                <Card.Text >
                  {/* {e.desc} */}
                  <p className="overflow-hidden"> Và đay cung thế tất cả chỉ là những lorm vaen bản tượng trưng.</p>
                </Card.Text>
                <Button variant="success">link</Button>
              </Card.Body>
            </Card>
          </Slider>
        </div>

      </div>
    </>
  );
}
export default Detail;
