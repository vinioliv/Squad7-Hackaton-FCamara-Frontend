import api from "./api";

export async function saveNewDate(data){
    return (await api.post("http://localhost:3333/v1/saveschedule", data,{
        headers: {
            Authorization: 2
        }
    }).then()).data;
}