import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';

import { useSignIn } from 'api/auth/useSignIn';

type SignInStatus = 'init' | 'loading' | 'success' | 'bad_credentials' | 'error';

const SignIn = () => {
  const { signIn } = useSignIn();
  const [signInStatus, setSignInStatus] = useState<SignInStatus>('init');
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: Yup.object({
      login: Yup.string().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      setSignInStatus('loading');
      try {
        const token = await signIn(values);
        localStorage.setItem('token', token);
        setSignInStatus('success');
        router.push('/');
      } catch (error) {
        error === 'BAD_CREDENTIALS' ? setSignInStatus('bad_credentials') : setSignInStatus('error');
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-green-200 px-6 py-8 rounded shadow-md text-black w-full">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="login">Login</label>
            <input
              id="login"
              type="text"
              {...formik.getFieldProps('login')}
              className="block border border-green-800 w-full p-3 rounded"
            />
            {formik.touched.login && formik.errors.login ? (
              <div className="text-red-500">{formik.errors.login}</div>
            ) : null}

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...formik.getFieldProps('password')}
              className="block border border-green-800 w-full p-3 rounded"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 hover:bg-green-600 focus:outline-none my-1"
            >
              Submit
            </button>
          </form>
          {signInStatus === 'success' ? <div className="text-green-500">You are logged in</div> : null}
          {signInStatus === 'bad_credentials' ? <div className="text-red-500">Incorrect login/password</div> : null}
          {signInStatus === 'error' ? <div className="text-black-800">An error occured...</div> : null}
          <div className="text-green-500 mt-6">
            Don't have an account?
            <Link href={'/auth/sign-up'}>
              <a className="no-underline border-b border-blue-500 text-blue-500">Sign up.</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
