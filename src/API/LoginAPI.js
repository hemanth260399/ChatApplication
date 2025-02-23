import axios from "axios";
let url = import.meta.env.VITE_BE_URL
export const googleLoginAPI = async (data) => {
    try {
        let response = await axios.post(url, data)
        return response.data;
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
export const allChatAPI = async () => {
    try {
        let response = await axios.get(`${url}/chatboxmsg`, {
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        return response.data;
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}