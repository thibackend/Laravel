import React, { useState, useEffect } from "react";
import { BiWorld, BiUser } from "react-icons/bi";
import tokenService from "../../services/token.service";
import { useNavigate, Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Filters from "./Filters";
import axios from "axios";
import "./profile.css";
import { getUsers } from "../../services/home";

const Navbar = () => {
  const user = tokenService.getToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    setTimeout(() => {
      tokenService.removeToken();
      navigate('/');
    }, 1000);
  }

  const [userData, setUserData] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [editData, setEditData] = useState({
    image: '',
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  const fetchUserData = () => {
    // try {
    //   const response = await axios.get("http://127.0.0.1:8000/api/users");
    //   const data = response.data;
    //   const userItem = data.find(item => item.email === user.email);
    //   setUserData(userItem);
    //   console.log(userItem.email);
    // } catch (error) {
    //   console.error("Error fetching user data:", error);
    // }
    getUsers().then(
      res => {
        const userItem = res.find(item => item.email === user.email);
        setUserData(userItem);
      }
    ).catch(
      err => console.log("ERORR Fetch Data user:", err)
    )
  };

  useEffect(() => {
    if (!userData) {
      fetchUserData();
    }
  }, [userData]);



  const handleProfileOpen = () => {
    setShowProfile(true);
  };

  const handleProfileClose = () => {
    setShowProfile(false);
  };

  const handleEditOpen = () => {
    setEditingMode(true);
    setShowProfile(true);
    setEditData({ ...userData });
  };


  const handleSave = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/users/${userData.id}`, editData);
      console.log(response.data.message);
      // Refresh user data
      const updatedUserData = { ...userData, ...editData };
      setUserData(updatedUserData);
      setShowProfile(false);
      setEditingMode(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditData({ ...editData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{ backgroundImage: "url('https://digital.ihg.com/is/image/ihg/ihgor-member-rate-web-offers-1440x720')" }}
      className="border-b sticky top-0 z-50 bg-white/[100%]">
      <div className="flex justify-between items-center sm:mx-6 md:mx-10 lg:mx-12 ">
        <div className="h-20 flex" >
          <Link to="/" >
            <a className="logo-web" >3TS HOTEL</a>
          </Link>
        </div>

        <Filters />
        <div
          className="flex items-center pr-3  font-semibold text-gray-600"
        >
          <div className="flex items-center mx-8 gap-1">
            <BiWorld className="" />
            <div className="language">
              <select className="border px-2 py-1">
                <option>English</option>
                <option>Tiếng Việt</option>
              </select>
            </div>
          </div>
          {userData ? (
            <div onClick={handleProfileOpen} className="flex items-center border px-1 py-1 rounded-full cursor-pointer gap-2 bg-[#ff5a60] 
            text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out">
              <img src={userData.image} alt="Avatar" className="w-12 h-12 rounded-full" />
            </div>
          ) : (
            <div className="flex items-center border px-3 py-2 rounded-full cursor-pointer gap-2 bg-[#ff5a60] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out">
              <p>{user ? user.username : "Sign in"}</p>
              <BiUser className="text-[22px]" />
            </div>
          )}
        </div>
        <Modal show={showProfile} onHide={handleProfileClose} className="right-aligned-modal">
          <Modal.Header closeButton>
            <Modal.Title className="title-profile">Trang cá nhân của bạn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {userData && !editingMode && (
                <>
                  <img className="image-profile" src={userData.image} alt="User Avatar" />
                  <h4>{userData.name}</h4>
                  <p>Email: <span>{userData.email}</span></p>
                  <p>Địa chỉ: <span>{userData.address}</span></p>
                  <p>Số điện thoại: <span>{userData.phone}</span></p>
                </>
              )}
              {userData && editingMode && (
                <>
                  <img className="image-profile" src={userData.image} alt="User Avatar" />
                  Hình ảnh:
                  <input type="file" onChange={(e) => handleFileChange(e)} />
                  <br />
                  Tên của bạn:
                  <input type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
                  <br />
                  Email:
                  <input type="text" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
                  <br />
                  Địa chỉ:
                  <input type="text" value={editData.address} onChange={(e) => setEditData({ ...editData, address: e.target.value })} />
                  <br />
                  Số điện thoại:
                  <input type="number" value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} />
                  <br />

                </>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            {!editingMode && (
              <>
                <Button variant="primary" onClick={handleEditOpen}>
                  Edit
                </Button>
                <Button variant="secondary" onClick={handleProfileClose}>
                  Close
                </Button>
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
            {editingMode && (
              <>
                <Button variant="success" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="secondary" onClick={() => setEditingMode(false)}>
                  Cancel
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
