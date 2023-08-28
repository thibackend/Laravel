import { ApiService } from "../api.service"




export const Select = (data) => {
    return ApiService.get('/users')
}