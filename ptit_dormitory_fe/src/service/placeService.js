import {get} from "../utils/request.js"

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

