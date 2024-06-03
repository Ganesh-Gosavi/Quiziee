import React, { useState } from 'react';
import style from './styles/LoginForm.module.css';
import { toast } from 'react-hot-toast'; // For displaying notifications
import validator from 'validator'; // For email validation
import { login } from '../../apis/auth'; // Function for logging in
import { setToken } from '../../slices/authSlice'; // Action creator for setting the token
import { useDispatch } from 'react-redux'; // For dispatching actions

// LoginForm Component
export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const dispatch = useDispatch(); // Hook to dispatch actions

  // Handler for input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handler for form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Validate email format
    if (!validator.isEmail(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    const result = await login(formData); // Call the login function
    if (result) {
      dispatch(setToken(result)); // Dispatch the token if login is successful
    }
  };

  return (
    <>
      {/* Login form */}
      <form className={style.container} onSubmit={onSubmitHandler}>
        <div className={style.inputContainer}>
          <label className={style.label}>Email</label>
          <input
            type='email'
            className={style.input}
            name='email'
            value={formData.email}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className={style.inputContainer}>
          <label className={style.label}>Password</label>
          <input
            type='password'
            className={style.input}
            name='password'
            value={formData.password}
            onChange={onChangeHandler}
            required
          />
        </div>
        <button type='submit' className={style.button} style={{ marginTop: "15px" }}>
          Log in
        </button>
      </form>
    </>
  );
}
