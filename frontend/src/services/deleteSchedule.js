import api from "./api";

export async function deleteDateScheduled(data){
    return (await api.post("http://localhost:3333/v1/deleteschedule", data,{
        headers: {
            Authorization: 2
        }
    }).then()).data;
}