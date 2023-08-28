import { ApiService } from "../api.service"




export const SelectAllServices = (dataser) => {
    return ApiService.post('/services')
}