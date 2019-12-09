import React, { Component } from "react";
import "./Signup.css";
import api from "../../../api/api";
import { Form, Input, Tooltip, Icon, Select, Checkbox, Button } from "antd";

const { Option } = Select;

class RegistrationForm extends Component {
  // state = {
  //   username: "",
  //   password: "",
  //   email: ""
  // };

  state = {
    confirmDirty: false
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  // handleSubmit = async e => {
  //   e.preventDefault();

  //   const response = await api({
  //     url: "http://localhost:5000/api/users/signup",
  //     method: "POST",
  //     data: this.state
  //   });

  //   if (response.status === 200) {
  //     this.setState({
  //       username: "",
  //       password: "",
  //       email: ""
  //     });
  //     console.log(this.props.history);

  //     this.props.history.push("/login");
  //   }
  // };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    //   const { username, password, email } = this.state;
    //   return (
    //     <form onSubmit={e => this.handleSubmit(e)}>
    //       <div>
    //         <label>Username</label>
    //         <input
    //           type="text"
    //           name="username"
    //           placeholder="Username"
    //           value={username}
    //           onChange={e => this.handleChange(e)}
    //         />
    //       </div>
    //       <div>
    //         <label>Password</label>
    //         <input
    //           type="password"
    //           name="password"
    //           placeholder="Password"
    //           value={password}
    //           onChange={e => this.handleChange(e)}
    //         />
    //       </div>
    //       <div>
    //         <label>Email</label>
    //         <input
    //           type="text"
    //           name="email"
    //           placeholder="Email"
    //           value={email}
    //           onChange={e => this.handleChange(e)}
    //         />
    //       </div>
    //       <div>
    //         <button type="submit">Signup!</button>
    //       </div>
    //     </form>
    //   );
    // }
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "55"
    })(
      <Select style={{ width: 70 }}>
        <Option value="55">+55</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    return (
      <article class="mw6 center bg-white shadow-5 br3 pa3 pa4-ns mv3 ba b--black-10">
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="E-mail">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("nickname", {
              rules: [
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Phone Number">
            {getFieldDecorator("phone", {
              rules: [
                { required: true, message: "Please input your phone number!" }
              ]
            })(
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            )}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator("agreement", {
              valuePropName: "checked"
            })(
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </article>
    );
  }
}

const Signup = Form.create({ name: "register" })(RegistrationForm);

export default Signup;
