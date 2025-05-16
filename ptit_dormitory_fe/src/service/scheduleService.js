import {get, patch, post} from "../utils/request.js"

export const getListSchedule = async (shift_date, place_id, page = 1, limit = 5)=>{
    const params = new URLSearchParams();
    if(shift_date){
        params.append("shift_date", shift_date);
    }
    if(place_id){
        params.append("place_id", place_id);
    }
    if(page){
        params.append("page", page);
    }
    if(limit){
        params.append("limit", limit);      
    }

    const url = `api/shiftSchedule/getListOfAllUser?${params.toString()}`
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

export const getAttendanceOfShift = async (
  shift_id,
  place_id,
  page = 1,
  limit = 5
) => {
  const params = new URLSearchParams();
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);

  // URL của API attendanceOfShift
  const url = `api/shiftSchedule/attedanceOfShift/${shift_id}/${place_id}?${params.toString()}`;
  
  const res = await get(url);
  // res trả về đúng structure: { pagination, attendanceStatus, reports, data }
  return res;
};