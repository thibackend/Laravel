import { ApiService } from "../api.service"




export const SelectSeviceById = (ids) => {
    return ApiService.get('/services')
}