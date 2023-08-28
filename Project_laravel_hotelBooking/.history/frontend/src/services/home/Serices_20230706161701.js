import { ApiService } from "../api.service"




export const getUsers = () => {
    return ApiService.get('/users')
}