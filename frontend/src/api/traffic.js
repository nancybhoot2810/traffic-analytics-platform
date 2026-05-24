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

export const getPaginatedCountries = async (page = 1, limit = 3) => {
  const res = await axios.get(`${BASE_URL}/traffic/countries/paginated`, {
    params: {
      page,
      limit,
    },
  });

  return res.data;
};

export const getAllTraffic = async () => {
  const res = await axios.get(`${BASE_URL}/traffic`);
  return res.data;
};

export const createTraffic = async (payload) => {
  const res = await axios.post(`${BASE_URL}/traffic`, payload);
  return res.data;
};

export const updateTraffic = async (id, payload) => {
  const res = await axios.put(`${BASE_URL}/traffic/${id}`, payload);
  return res.data;
};

export const deleteTraffic = async (id) => {
  const res = await axios.delete(`${BASE_URL}/traffic/${id}`);
  return res.data;
};