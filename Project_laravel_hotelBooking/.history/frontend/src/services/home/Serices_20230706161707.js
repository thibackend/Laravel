import { ApiService } from "../api.service"




export const getUsers = (data) => {
    return ApiService.get('/users')
}