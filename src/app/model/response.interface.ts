export interface BaseResponse<T> {
    data: T;
    messages: {
      code: string;
      message: string;
    }
  }