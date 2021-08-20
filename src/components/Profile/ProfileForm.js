import { useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {

  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContext);
  const history = useHistory();


  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = newPasswordRef.current.value;
    //add validation optional
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAyGfFwqYQ9CIcIXZR8_dXDBa-yjwaiSpc';
    fetch(url,
      {
        method:'POST',
        body:JSON.stringify({
          idToken: authCtx.token,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      ).then(res => {
        history.replace('/');
      })

  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input minLength='7' type='password' id='new-password' ref={newPasswordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
