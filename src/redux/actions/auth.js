import axios from 'axios';
import { SIGN_IN, SIGN_UP, AUTH_ERROR } from './constants';
import { Alert, AsyncStorage } from 'react-native';

// SIGN_IN
export const login = (email, password, callBack) => async (dispatch) => {
  // console.log('LOGIN ACTION:', phoneNumber, password);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let formData = new FormData();
  formData.append('user_phone', email);
  formData.append('password', password);

  try {
    let loginURL = `https://gotruck.netismsoft.com/api/user/login`;
    
    const res = await fetch(loginURL, {
      method: 'POST',
      body: formData, 
    });

    let resp = await res.json();

    if(resp && resp.user_name){
      console.log(resp, "qwert");
      await AsyncStorage.setItem(
        "name",
        resp.user_name
      );
      await AsyncStorage.setItem(
        "number",
        resp.user_phone
      );
      callBack()
      dispatch({
        type: SIGN_IN,
        payload: res.data,
      });
    }else {
      throw "Wrong Credentials"
    }
  } catch (error) {
    alert(error)
    console.log('ERROR :', error);
    dispatch({
      type: AUTH_ERROR
    })
  }
};

// SIGN_UP
export const register = (form, name, callback, loadingCallback) => async (dispatch) => {
  try {
    let registerURL = `https://gotruck.netismsoft.com/api/user/signup`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // const data = new FormData();
    // const fileToUpload = form.document_proof;
    // data.append('document_proof', fileToUpload);
    // delete form['document_proof'];
    const res = await fetch(registerURL, {
        method: 'POST',
        body: form, 
      });

      loadingCallback();
    await AsyncStorage.setItem('name', name);
    // alert(res, "RESP")
    callback();
    dispatch({
      type: SIGN_UP,
      payload: res.data,
    });
  } catch (error) {
    loadingCallback();
    alert(JSON.stringify(error))
    // alert('ERROR :', error);
  }
};
