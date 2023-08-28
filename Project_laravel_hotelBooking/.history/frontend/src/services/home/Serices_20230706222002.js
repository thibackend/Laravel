import { ApiService } from "../api.service"




export const SelectAllServices = (dataServices) => {
    return ApiService.post('/services')
}