import { useState } from 'react'; // Import useState hook from React
import LoginForm from './LoginForm'; // Import LoginForm component
import SignupForm from './SignupForm'; // Import SignupForm component
import style from './styles/TemplateForm.module.css'; // Import CSS module for styling

// Component representing a form template for login and signup
export default function TemplateForm() {
  const [formType, setFormType] = useState("signup"); // State to manage the type of form (login/signup)

  // Function to switch the form type to login
  const setForm = () => {
    setFormType("login");
  }

  return (
    <div className={style.container}>
      <h2 className={style.heading}>QUIZZIE</h2>
      <div className={style.formButton}>
        {/* Button to switch to the signup form */}
        <button 
          className={`${style.button} ${formType === 'signup' && style.active}`} 
          onClick={() => setFormType('signup')}
        >
          Sign Up
        </button>
        {/* Button to switch to the login form */}
        <button 
          className={`${style.button} ${formType === 'login' && style.active}`} 
          onClick={() => setFormType('login')}
        >
          Log In
        </button>
      </div>
      {/* Render SignupForm or LoginForm based on the current formType */}
      {
        formType === "signup" ? <SignupForm setForm={setForm} /> : <LoginForm />
      }
    </div>
  );
}
