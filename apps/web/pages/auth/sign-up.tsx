import { useFormik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import * as Yup from 'yup';

import { useSignUp } from 'api/auth/useSignUp';

type SignUpStatus = 'init' | 'loading' | 'success' | 'email_exists' | 'username_exists' | 'error';

const SignUp = () => {
  const { signUp } = useSignUp();
  const [signUpStatus, setSignUpStatus] = useState<SignUpStatus>('init');

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(30, 'Must be 30 characters or less')
        .matches(/^[^@ ]+$/, 'Spaces and at sign are forbidden')
        .required(),
      email: Yup.string().email('Invalid email address').required(),
      password: Yup.string()
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          'Must have at least 8 characters, 1 uppercase letter and 1 lowercase letter',
        )
        .required(),
    }),
    onSubmit: async (values) => {
      setSignUpStatus('loading');
      try {
        const token = await signUp(values);
        setSignUpStatus('success');
      } catch (error) {
        if (error === 'EMAIL_EXISTS') setSignUpStatus('email_exists');
        else if (error === 'USERNAME_EXISTS') setSignUpStatus('username_exists');
        else setSignUpStatus('error');
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-green-200 px-6 py-8 rounded shadow-md text-black w-full">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              {...formik.getFieldProps('username')}
              className="block border border-green-800 w-full p-3 rounded"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500">{formik.errors.username}</div>
            ) : null}

            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps('email')}
              className="block border border-green-800 w-full p-3 rounded"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
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
          {signUpStatus === 'success' ? <div className="text-green-500">You are logged in</div> : null}
          {signUpStatus === 'email_exists' ? (
            <div className="text-red-500">Email already exists. Please sign in</div>
          ) : null}
          {signUpStatus === 'username_exists' ? (
            <div className="text-black-800">Username already exists. Please sign in</div>
          ) : null}
          {signUpStatus === 'error' ? <div className="text-black-800">An error occured...</div> : null}
          <div className="text-green-500 mt-6">
            Already have an account?
            <Link href={'/auth/sign-in'}>
              <a className="no-underline border-b border-blue-500 text-blue-500">Sign in.</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
