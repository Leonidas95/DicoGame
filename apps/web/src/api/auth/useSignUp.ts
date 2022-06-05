import { AxiosError } from 'axios';
import { useCallback } from 'react';

import { axiosInstance } from 'api';

interface SignUpDto {
  username: string;
  email: string;
  password: string;
}

const _signUp = async (dto: SignUpDto): Promise<{ token: string }> => {
  const res = await axiosInstance.post<{ token: string }>('auth/sign-up', dto);
  return res.data;
};

export const useSignUp = () => {
  const signUp = useCallback(async (dto: SignUpDto) => {
    try {
      const data = await _signUp(dto);
      return data.token;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response?.data.message;
      }
    }
  }, []);

  return { signUp };
};
