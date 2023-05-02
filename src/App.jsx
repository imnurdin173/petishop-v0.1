import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import "bootstrap/dist/css/bootstrap.css";
import MyNavbar from "./components/MyNavbar";
import Footer from "./components/Footer";
import Register from "./pages/Auth/Register";
import { connect } from "react-redux";
import { userKeepLoggedIn, checkStorage } from "./redux/action/user";

class App extends React.Component {
  componentDidMount() {
    const userLocalStorage = localStorage.getItem('userDataPet')
    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);
      this.props.userKeepLoggedIn(userData);
    } else {
      this.props.checkStorage();
    }
  }

  render() {
    if (this.props.userGlobal.storageIsChecked) {
      return (
        <BrowserRouter>
          <MyNavbar />
          <Routes>
            {/* <Route path="*" element={<notfound404 />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      );
    } else {
      return (
        <div>
          Tunggu bentar...
        </div>
      )
    }
  }
}

const mapStatetoProps = (state) => {
  return {
    userGlobal: state.user
  }
}
const mapDispatchtoProps = {
  userKeepLoggedIn,
  checkStorage
}
export default connect(mapStatetoProps, mapDispatchtoProps)(App);
