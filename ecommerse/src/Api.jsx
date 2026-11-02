import axios from 'axios'
import React from 'react'

const Api = axios.create({
    baseURL: "https://onlinestore-2-p31i.onrender.com",
    withCredentials: true
});

Api.interceptors.request.use((config) => {

    const csrfToken = document.cookie
        .split("; ")
        .find(cookie => cookie.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];

    if (csrfToken) {
        config.headers["X-XSRF-TOKEN"] =
            decodeURIComponent(csrfToken);
    }

    return config;
});

export default Api