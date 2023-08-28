import { ApiService } from "../api.service"




export const SelectSeviceById = () => {
    return ApiService.get('/services')
}