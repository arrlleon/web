import axios from "axios";

export const axiosClient = axios.create({
    baseURL:"https://test8-9162b-default-rtdb.europe-west1.firebasedatabase.app/"
});