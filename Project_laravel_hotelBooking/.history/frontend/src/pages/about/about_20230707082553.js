import React from "react";
import "./about.css";
import image from "./image/myPicture.jpg";
const AboutUs = () => {
  const members = [
    {
      id: 1,
      name: "John Doe",
      position: "CEO",
      image: "john.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "CTO",
      image: "jane.jpg",
    },
    // Thêm thông tin về các thành viên khác
  ];

  const services = [
    "Phòng nghỉ sang trọng",
    "Nhà hàng đa dạng",
    "Spa và dịch vụ làm đẹp",
    "Trung tâm hội nghị và sự kiện",
    // Thêm các dịch vụ khác
  ];

  return (
    <div className="about-container">
      <div className="row">
        <div className="col-md-6">
          <h1 className="about-heading">Về chúng tôi</h1>
          <div className="content">
            <div>
              3TS Hotel's mission is to build products and technological
              solutions that accurately and comprehensively meet the needs of
              customers. We aim to minimize spending on functionalities that are
              beyond the scope of customer requirements. Leveraging the full
              potential of technology, we help our customers achieve their
              business goals. We believe in building systems from the ground up
              and providing continuous support throughout their lifecycl
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <img src={image} alt="" />
        </div>
      </div>

      <h1 className="section-heading">Ngày thành lập</h1>
      <div>Hotel 3TS được thành lập vào ngày 1 tháng 6 năm 2023.
        với 4 thành viên chính. Với sự đóng góp và nỗ lực không ngừng nghĩ thì 
        chúng tôi đã phát
      </div>
      

      <h3 className="section-heading">Thành viên thành lập</h3>
      <div className="members-container">
        {members.map((member) => (
          <div key={member.id} className="member-item">
            <img
              className="member-image"
              src={member.image}
              alt={member.name}
            />
            <h4 className="member-name">{member.name}</h4>
            <p className="member-position">{member.position}</p>
          </div>
        ))}
      </div>

      <h3 className="section-heading">Sứ mệnh</h3>
      <p>
        Sứ mệnh của chúng tôi là mang đến cho khách hàng những trải nghiệm lưu
        trú đẳng cấp và dịch vụ chất lượng cao với sự chăm sóc tận tâm và sự hài
        lòng tối đa.
      </p>

      <h3 className="section-heading">Dịch vụ</h3>
      <ul className="services-list">
        {services.map((service, index) => (
          <li key={index} className="service-item">
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutUs;
