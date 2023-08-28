import { ApiService } from "../api.service"


export const SelectAllServices = (data) => {
    return ApiService.post('/bills',dataPost)
}