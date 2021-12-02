// @flow
import type {
    AxiosRequestConfig,
    AxiosError,
    AxiosResponse,
    AxiosInstance,
} from 'axios';
import axios from 'axios';
import Router from 'next/router';
import * as cookie from 'js-cookie';
import { JWT_TOKEN } from '../definations';
import { IsSSR } from '../utils';

export class HttpRequest {
    private static buildHeader = (): any => {
        const headers: any = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        };

        let token: string | undefined = '';
        if (!IsSSR()) {
            token = cookie.get(JWT_TOKEN);
        }

        if (token && token !== 'undefined') {
            headers.Authorization = `Bearer ${token}`;
        }

        return headers;
    };

    private static buildRequest = (
        params?: AxiosRequestConfig
    ): AxiosInstance => {
        return axios.create({
            baseURL: '/api',
            headers: HttpRequest.buildHeader(),
            ...params,
        });
    };

    private static catchRequest = (
        requestFnc: () => Promise<AxiosResponse<any>>
    ): Promise<any> => {
        return requestFnc()
            .then(({ data }: any) => Promise.resolve(data.data))
            .catch((err: AxiosError<any>): boolean | Promise<boolean> => {
                if (err.response && err.response.status === 401) {
                    const currentRoute = Router.pathname;
                    return Router.push(
                        `/logout${
                            !currentRoute ? '' : `?redirect=${currentRoute}`
                        }`
                    );
                }
                throw err.response?.data;
            });
    };

    static Get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return HttpRequest.catchRequest(() =>
            HttpRequest.buildRequest().get(url, config)
        );
    }

    static Post<T>(
        url: string,
        data?: object,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return HttpRequest.catchRequest(() =>
            HttpRequest.buildRequest().post(url, data, config)
        );
    }

    static Put<T>(
        url: string,
        data?: object,
        config?: AxiosRequestConfig
    ): Promise<T> {
        return HttpRequest.catchRequest(() =>
            HttpRequest.buildRequest().put(url, data, config)
        );
    }

    static Delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return HttpRequest.catchRequest(() =>
            HttpRequest.buildRequest().delete(url, config)
        );
    }
}
