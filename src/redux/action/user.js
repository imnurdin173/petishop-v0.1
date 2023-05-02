import Axios from "axios";
import { API_URL } from "../../constants/API";

export const registerUser = ({ email, nama, handphone, password }) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/users`, {
      email,
      nama,
      handphone,
      password,
      role: "user",
    })
      .then((result) => {
        // console.log(result.data);
        delete result.data.password;
        dispatch({
          type: "USER_LOGIN",
          payload: result.data,
        });
        alert("Register berhasil. Silakan login");
      })
      .catch((error) => {
        alert("Gagal register");
        console.error(error);
      });
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        email: email,
      },
    })
      .then((result) => {
        if (result.data.length) {
          if (password === result.data[0].password) {
            // console.log(result.data);
            delete result.data[0].password;
            localStorage.setItem("userDataPet", JSON.stringify(result.data[0]));

            dispatch({
              type: "USER_LOGIN",
              payload: result.data[0],
            });
          } else {
            dispatch({
              type: "USER_ERROR",
              payload: "Password lu salah coy",
            });
          }
        } else {
          dispatch({
            type: "USER_ERROR",
            payload: "Akun lu salah woi",
          });
        }
      })
      .catch((error) => {
        alert("gk bisa masuk, salah akun lu");
      });
  };
};

export const logoutUser = () => {
  localStorage.removeItem("userDataPet");
  return { type: "USER_LOGOUT" };
};

export const userKeepLoggedIn = (userDataPet) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        id: userDataPet.id,
      },
    })
      .then((result) => {
        delete result.data[0].password;
        localStorage.setItem("userDataPet", JSON.stringify(result.data[0]));
        dispatch({
          type: "USER_LOGIN",
          payload: result.data[0],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const checkStorage = () => {
  return {
    type: "CHECK_STORAGE",
  };
};
