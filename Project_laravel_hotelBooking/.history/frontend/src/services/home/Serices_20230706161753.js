import { ApiService } from "../api.service"




export const SelectSeviceById = (data) => {
    return ApiService.get('/users')
}