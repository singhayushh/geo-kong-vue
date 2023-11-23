import { AxiosResponse } from "axios";
import api from ".";

type Settings = {
    mode: string;
    selectedCountries: string[];
}

export const updateGeoKongSettings = async (settings: Settings) => {
    const response: AxiosResponse = await api.post('/update_geo', settings);
    return response.data;
};