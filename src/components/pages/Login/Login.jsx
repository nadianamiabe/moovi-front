import React, { Component } from 'react';
import api from '../../../api/api';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class NormalLoginForm extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });

    const response = await api({
      url: 'http://localhost:5000/api/users/login',
      method: 'POST',
      data: this.state
    });

    if (response.status === 200) {
      const token = JSON.stringify(response.data);
      const { authenticateUser, history } = this.props;

      localStorage.setItem('loggedUser', token);
      authenticateUser();
      history.push('/');
    }
  };

  render() {
    // const { username, password } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <article class="mw6 center bg-white shadow-5 br3 pa3 pa4-ns mv3 ba b--black-10">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {/* {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)} */}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </article>
      // <form onSubmit={e => this.handleSubmit(e)}>
      //   <div>
      //     <label>Username</label>
      //     <input
      //       type="text"
      //       name="username"
      //       placeholder="Username"
      //       value={username}
      //       onChange={e => this.handleChange(e)}
      //     />
      //   </div>
      //   <div>
      //     <label>Password</label>
      //     <input
      //       type="password"
      //       name="password"
      //       placeholder="Password"
      //       value={password}
      //       onChange={e => this.handleChange(e)}
      //     />
      //   </div>
      //   <div>
      //     <button type="submit">Entrar!</button>
      //   </div>
      // </form>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

//ReactDOM.render(<WrappedNormalLoginForm />, mountNode);

export default Login;
