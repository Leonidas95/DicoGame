import { AxiosError } from 'axios';
import { useCallback } from 'react';

import { axiosInstance } from 'api';

interface SignInDto {
  login: string;
  password: string;
}

const _signIn = async (dto: SignInDto): Promise<{ token: string }> => {
  const res = await axiosInstance.post<{ token: string }>('auth/sign-in', dto);
  return res.data;
};

export const useSignIn = () => {
  const signIn = useCallback(async (dto: SignInDto) => {
    try {
      const data = await _signIn(dto);
      return data.token;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response?.data.message;
      }
    }
  }, []);

  return { signIn };
};
