import { ApiService } from "../api.service"




export const SelectAllServices = (dataServicesid) => {
    return ApiService.post('/serviceGetById',dataServicesid)
}