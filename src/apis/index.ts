import axios from "axios";

// export const API_BASE_URL = "https://www.과제_API_공통_주소";
export const API_BASE_URL = "/api";

//noti: response 형식 예상. 만약 해당 형식이 아닌 경우 수정 필요.
interface FetchResponseType<T> {
	code: number;
	message: string;
	data: T;
}

export const api = axios.create({
	baseURL: API_BASE_URL,
	// withCredentials: true,
});

api.interceptors.request.use((config) => {
	const accessToken = localStorage.getItem("accessToken");
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

export const get = <T>(...args: Parameters<typeof api.get>) => {
	return api.get<FetchResponseType<T>>(...args);
};

export const post = <T>(...args: Parameters<typeof api.post>) => {
	return api.post<FetchResponseType<T>>(...args);
};

export const patch = <T>(...args: Parameters<typeof api.patch>) => {
	return api.patch<FetchResponseType<T>>(...args);
};

export const put = <T>(...args: Parameters<typeof api.put>) => {
	return api.put<FetchResponseType<T>>(...args);
};

export const del = <T>(...args: Parameters<typeof api.delete>) => {
	return api.delete<FetchResponseType<T>>(...args);
};
