import { ApiService } from "../api.service"




export const Select = () => {
    return ApiService.get('/services')
}