import api from "./api";

export async function post(data){
    return (await api.post("http://localhost:3333/v1/consultavailability", data,{
        headers: {
            Authorization: 2
        }
    }).then()).data;
}