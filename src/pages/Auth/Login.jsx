import React from "react";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../../redux/action/user";
import { connect } from "react-redux";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  }

  inputHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value })
  }

  render() {
    if (this.props.userGlobal.id) {
      return <Navigate to="/" />
    }
    return <div className="loginContainer">
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Login Account</h1>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-4 offset-4">
            <div className="card">
              {
                this.props.userGlobal.errMsg ? <div className="alert alert-danger">{this.props.userGlobal.errMsg}</div> : null
              }
              <div className="card-body">
                <h5 className="mb-3 font-weight-bold">Login</h5>
                <input onChange={this.inputHandler} type="email" className="form-control my-2" placeholder="email" name="email" />
                <input onChange={this.inputHandler} type="password" className="form-control my-2" placeholder="password" name="password" />
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <button onClick={() => this.props.loginUser(this.state)} className="btn btn-primary mt-2">Login</button>
                  <span>or</span><Link to="/register" style={{ color: "blue" }}>Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  }
}

const mapStatetoProps = (state) => {
  return {
    userGlobal: state.user
  };
}

const mapDispatchtoProps = {
  loginUser
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Login);
