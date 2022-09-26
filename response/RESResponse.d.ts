declare namespace RESResponse {

    type Response<T> = {
        code: number;
        message: string;
        data: T;
    }

    type Paginate<T> = {
        size: number;
        page: number;
        total: number;
        data?: T[];
    }
}