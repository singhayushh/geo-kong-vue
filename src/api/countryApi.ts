import { AxiosResponse } from "axios";
import api from ".";

export const fetchCountryList = async () => {
    const response: AxiosResponse = await api.get('/get_country_list');
    return response.data.countries;
};