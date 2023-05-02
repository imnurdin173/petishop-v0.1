import React from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import { API_URL } from '../../constants/API';
import { registerUser, loginUser } from '../../redux/action/user';
import { connect } from 'react-redux';

class Register extends React.Component {
  state = {
    email: "",
    nama: "",
    handphone: "",
    password: ""
  }
  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value })
  }
  registerHandler = () => {
    const { email, nama, handphone, password } = this.state;
    Axios.post(`${API_URL}/users`, { email, nama, handphone, password })
      .then(() => {
        alert("Register berhasil. Silakan login")
      })
      .catch((error) => {
        alert("Gagal register");
        console.error(error);
      })
  }

  render() {
    return <div>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Register Account</h1>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4 offset-4">
            <div className="card">
              <div className="card-body">
                <h5 className="mb-3 font-weight-bold">Register</h5>
                <input onChange={this.inputHandler} type="email" className="form-control my-2" placeholder="email" name="email" />
                <input onChange={this.inputHandler} type="text" className="form-control my-2" placeholder="nama" name="nama" />
                <input onChange={this.inputHandler} type="number" className="form-control my-2" placeholder="Handphone" name="handphone" />
                <input onChange={this.inputHandler} type="password" className="form-control my-2" placeholder="password" name="password" />
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button onClick={() => this.props.registerUser(this.state)} className="btn btn-primary mt-2">Register</button>
                  <span>or</span><Link to="/login" style={{ color: "blue" }}>Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >;
  }
}

const mapStatetoProps = () => {
  return {}
};
const mapDispatchtoProps = {
  registerUser
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Register);
