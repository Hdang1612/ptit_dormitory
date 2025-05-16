import {get, patch, post} from "../utils/request.js"

export const getRooms = async (parentId="B1", gender, status, search, page = 1, limit = 10)=>{
    const params = new URLSearchParams();
    params.append("level", "room");
    params.append("parent_id", parentId);

    if(gender){
        params.append("gender", gender);
    }
    if(status){
        params.append("status", status);
    }
    if(search){
        params.append("search", search);
    }
    if(page){
        params.append("page", page);
    }
    if(limit){
        params.append("limit", limit);      
    }

    const url = `api/place/getPlaces?${params.toString()}`
    console.log(url)
    try {
        const result = await get(url)

        if(!result){
            console.log("no data");
            return "";
        }
        return result
    } catch (error) {
        console.log("fetch error", error);
        return "";
    }

}
export const getAreas = async ()=>{
    const params = new URLSearchParams();
    params.append("level", "area")
    params.append("parent_id", "null");
     const url = `api/place/getPlaces?${params.toString()}`
     try {
        const result = await get(url)

        if(!result){
            console.log("no data");
            return "";
        }
        return result
    } catch (error) {
        console.log("fetch error", error);
        return "";
    }
}

export const getFloors = async (areaId) => {
    const params = new URLSearchParams();
    params.append("level", "floor");
    params.append("parent_id", areaId);
    const url = `api/place/getPlaces?${params.toString()}`;
    try {
      const result = await get(url);
      return result;
    } catch (error) {
      console.error("Fetch error in getFloors:", error);
      return { data: [] };
    }
  };

export const getPlaceDetail = async (id) => {
    return await get(`api/place/getPlaceDetail/${id}`);
  };

export const updatePlace = async (id, data) => {
    // giả sử server route là PATCH /api/place/updatePlace/:id
    return await patch(`api/place/updatePlace/${id}`, data);
  };

export const createPlace = async (data) => {
    try {
      const result = await post(`api/place/createPlace`, data)
      return result
    } catch (error) {
      console.error("fetch error in createPlace", error)
      throw error
    }
  };