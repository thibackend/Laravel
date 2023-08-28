import { ApiService } from "../api.service"

export const getRooms = () => {
    return ApiService.get('/room-and-images')
}
export const getRoomDetail = () => {
    return ApiService.get('/room-and-images')
}


export const roomdetail = () => {
    return ApiService.get('/room-detail')
}
// lấy tất cả services thuộc về một room theo room_id;
export const RommServices = (room_id) => {
    return ApiService.get(`/get-room-with-services/${room_id}`)
}

// hàm này để lấy tất cả users
export const getUsers = () => {
    return ApiService.get('/users')
}