import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { auth } from '../config/firebase';
import { Method } from '../interfaces/PocketBase.interface';

const pocketBaseUrl = 'https://notewave.pockethost.io';
export const useAxios = (params: AxiosRequestConfig<any>) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async (): Promise<void> => {
        try {
            setLoading(true);
            if(!params?.url?.includes(pocketBaseUrl)){
                params.url = pocketBaseUrl + params.url;
            }
            if(params.method === Method.get && params.params?.id !== null){
                params.params =  {
                    filter: `(userId='${auth.currentUser?.uid}' ||allUsers=true)`
                }
            }
            const response = await axios.request(params);
            setData(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError("Axios Error with Message: " + error.message);
            } else {
                setError(error);
            }
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return [data, error, loading, fetchData] as const;
}
