import React, { Component } from "react";
import api from "../../../api";
import { Form, Icon, Input, Button } from "antd";
import { Link } from "react-router-dom";

class NormalLoginForm extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });

    const response = await api({
      url: `${process.env.REACT_APP_API_URL}/users/login`,
      method: "POST",
      data: {
        username: this.state.username,
        password: this.state.password
      }
    });

    if (response.status === 200) {
      const token = JSON.stringify(response.data);
      const { authenticateUser, history } = this.props;

      localStorage.setItem("loggedUser", token);
      authenticateUser();
      history.push("/");
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <article class="mw6 center bg-white shadow-5 br3 pa3 pa4-ns mv7 ba b--black-10">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
                name="username"
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
              />
            )}
          </Form.Item>
          <Form.Item>
            {/* <a className="login-form-forgot" href="">
              Forgot password
            </a> */}
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>{" "}
            Ou <Link to="/users/signup">Se Cadastre!</Link>
          </Form.Item>
        </Form>
      </article>
    );
  }
}

const Login = Form.create({ name: "normal_login" })(NormalLoginForm);

export default Login;
