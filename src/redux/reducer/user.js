const init_state = {
  email: "",
  name: "",
  handphone: "",
  role: "",
  id: 0,
  errMsg: "",
  storageIsChecked: false,
};

const user = (state = init_state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, ...action.payload, storageIsChecked: true };
    case "USER_ERROR":
      return { ...state, errMsg: action.payload };
    case "USER_LOGOUT":
      return { ...init_state, storageIsChecked: true };
    case "CHECK_STORAGE":
      return { ...state, storageIsChecked: true };
    default:
      return state;
  }
};

export default user;
