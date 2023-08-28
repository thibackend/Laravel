import { ApiService } from "../api.service"




export const SelectSevice = (data) => {
    return ApiService.get('/users')
}