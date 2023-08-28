import React from "react";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import '../../css/roomDetail.css'
const Rentalnew = ({ data: rentalData }) => {
  return (
    <div className="row flex flex-wrap justify-between absolute w-full mt-12 pr-16 pl-6 font-semibold text-gray-600">
      {rentalData ? (
        rentalData.map((rental, index) => (
          <Link to={`detail/${rental.id}`}  className="room-show col-sm-3 mb-10" key={index}>
            <div className="relative">
              <div className="grad absolute w-full h-full rounded-b-[1.3rem]"></div>
              <div className="flex">
                {/* Background */}
                <img
                  src={
                    rental.image_path?.[0] ||
                    "https://us.123rf.com/450wm/dmitryag/dmitryag2106/dmitryag210600432/169715356-woman-taking-pictures-on-camera-sea-in-mountains-back-view.jpg?ver=6"
                  }
                  alt="#"
                  className="object-cover rounded-[1.3rem] sm:h-[17rem]  md:h-[13rem] w-full"
                />
                {/* Title */}
                <div className="absolute text-white font-bold bottom-6 left-6 text-[22px] flex items-center gap-2">
                  {/* Title Content */}
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="pt-3 flex justify-between items-start">
              {/* Left */}
              <div className="">
                <p className="max-w-[17rem] font-semibold text-[17px]">
                  {rental.name || ""}
                </p>
                <p className="max-w-[17rem]  text-[16px] -mt-1 text-gray-500">
                  Jan 28 - Aug 9
                </p>
                <p className="max-w-[17rem] font-semibold text-[17px]">
                  {rental.price || ""}$
                </p>
              </div>
              {/* Right */}
              <div className="flex items-center space-x-1">
                <BsStarFill />
                <p className="text-[15px]">{rental.star || ""}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <h1>No data found</h1>
      )}
    </div>
  );
};

export default Rentalnew;
