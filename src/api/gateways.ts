import axios from "axios";

export const defaultGateway=axios.create({
    baseURL:'http://localhost:3200'
 })
 