import Rentalnew from "./Rentalnew";

import { useEffect, useState} from "react";
import { getRooms } from "./../../services/home/index";

const Rentals = (props) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState("");
  const [roomPrice, setRoomPrice] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOptions(selectedValue);
  };

  const handlePriceChange = (event) => {
    const newPrice = parseInt(event.target.value);
    setRoomPrice(newPrice || 0);
  };

  const handleAllOption = () => {
    setSelectedOptions("");
    setRoomPrice(null);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/categories");
        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    Promise.all([fetchCategories()])
      .then(() => {
        // Once all API calls are completed successfully, update the filteredData state
        setFilteredData(data);
      })
      .catch((error) => {
        console.error("Error fetching data from APIs:", error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rooms = await getRooms();
        setData(rooms);
        setFilteredData(rooms);
      } catch (error) {
        console.error("Error fetching rooms data from API:", error);
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    let filteredRooms = [...data];

    // Apply category filter
    if (selectedOptions !== "") {
      filteredRooms = filteredRooms.filter(
        (room) => room.category_id.toString() === selectedOptions
      );
    }

    // Apply room price filter
    if (roomPrice !== null) {
      filteredRooms = filteredRooms.filter((room) => room.price <= roomPrice);
    }

    setFilteredData(filteredRooms);
  };

  useEffect(() => {
    // Call the applyFilters function whenever the filter options change
    applyFilters();
  }, [selectedOptions, roomPrice]);

  const checkboxListStyle = {
    maxHeight: "70px",
    overflowY: "auto",
  };

  return (
    <div>
      <div
        fullscreen
        style={{
          backgroundImage:
            "url('https://digital.ihg.com/is/image/ihg/ihgor-member-rate-web-offers-1440x720')",
          backgroundSize: "100% auto",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "relative",
          top: 0,
          left: 0,
          width: "100%",
          height: "600px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "white",
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Thêm thuộc tính justifyContent với giá trị 'center'
          }}
        >
          <h1
            style={{
              fontSize: "80px",
              lineHeight: 1.2,
              fontWeight: 700,
              fontFamily: "",
              textAlign: "center", // Căn giữa ngang dòng chữ
              verticalAlign: "middle", // Căn giữa dọc dòng chữ
            }}
          >
            Most Relaxing Place
          </h1>
        </div>

        <div
          style={{
            left: 0,
            right: 0,
            width: 800,
            height: 150,
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position:"absolute",
            top:450,
          }}
          className=" bg-white mt-2 w-[30rem] border border-gray-200 rounded-lg shadow-lg"
        >
          <button
            style={{
              backgroundColor: "#ff5a60",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleAllOption}
          >
            Show All
          </button>
          
          <label style={{ marginBottom: "5px" }}>
            <h3>Room Type</h3>
            <select
              style={{ padding: 10 }}
              value={selectedOptions}
              onChange={handleOptionChange}
            >
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  <span style={{ wordBreak: "break-word" }}>
                    {category.name}
                  </span>
                </option>
              ))}
            </select>
          </label>
          <label>
            <div style={{ padding: 10 }}>
              <h3>Room Price</h3>
              <input
                type="range"
                min="0"
                max="1000"
                value={roomPrice}
                onChange={handlePriceChange}
              />
              <div className="flex justify-between text-xs">
                <span>$0</span>
                <span>${roomPrice}</span>
                <span>$1000</span>
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="py-3 sm:py-5 container-fluid w-100">
        <div
          className="grid grid-col-1"
          style={{ flexWrap: "wrap" }}
        >
          {filteredData.length > 0 ? (
            <Rentalnew data={filteredData} />
          ) : (
            <h1>No data found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rentals;
