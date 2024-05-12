import axios from "axios";

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params:{
        key: 'e846e14db9de4bf79f5c7245c7c3e58a'
    }
})