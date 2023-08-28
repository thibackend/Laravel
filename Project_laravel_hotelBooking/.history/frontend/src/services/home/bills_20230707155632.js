import { ApiService } from "../api.service"


export const  = (dataPost) => {
    return ApiService.post('/bills',dataPost)
}