export interface ApiResponse<T> {
    timestamp: string;
    status: string;
    message: string;
    data: T[];
}

export interface ApiResponseData<T> {
    timestamp: string;
    status: string;
    message: string;
    data: T;
}