import axios from 'axios';

const baseURL = 'https://minion-url-shortener-server.vercel.app/'

export const axiosGet = (url) => {
    return axios.get(`${baseURL}${url}`)
}
export const axiosPost = (url, data) => {
    return axios.post(`${baseURL}${url}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
export const axiosDelete = (url, data) => {
    return axios.delete(`${baseURL}${url}`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}