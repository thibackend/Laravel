import { ApiService } from "../api.service"


export const SelectAllServices = (dataPost) => {
    return ApiService.post('/bills',dataPost)
}