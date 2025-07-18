import { api } from './api';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: number;
  institution?: string;
}

interface RegisterResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    role: number;
    institution?: string;
  };
  message: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: 'register',
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation<{ user: any }, { email: string; password: string }>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
