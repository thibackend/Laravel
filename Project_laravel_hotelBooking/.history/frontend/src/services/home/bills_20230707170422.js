import { ApiService } from "../api.service"

export const postDatabooking = (dataPost) => {
    return ApiService.post('/postBookBill',dataPost)
}