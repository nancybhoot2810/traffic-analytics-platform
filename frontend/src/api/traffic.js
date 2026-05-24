import axios from "axios";

const BASE_URL = "http://localhost:4000";

const formatDate = (date) => {
    if (!date) return null;
    return date.toISOString().split("T")[0];
};

export const getCountryTraffic = async (dateRange) => {
    const res = await axios.get(`${BASE_URL}/traffic/country`, {
        params: {
            startDate: formatDate(dateRange?.startDate),
            endDate: formatDate(dateRange?.endDate),
        },
    });

    return res.data;
};

export const getVehicleTraffic = async (dateRange) => {
    const res = await axios.get(`${BASE_URL}/traffic/vehicle`, {
        params: {
            startDate: formatDate(dateRange?.startDate),
            endDate: formatDate(dateRange?.endDate),
        },
    });

    return res.data;
};