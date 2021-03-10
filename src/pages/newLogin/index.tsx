import React, { Component } from "react"
import { Tabs, Form, Input, Button, Checkbox, Alert } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './style.less'
import { connect } from 'dva'

@connect(({ login1, loading }: {
  login1: any,
  loading: any
}) => ({
  login1,
  submitting: loading.effects['login1/login'],
}))

class Index extends Component {
  login = (values: any) => {
    const { dispatch, login1 } = this.props;
    if (login1.status === "error") {
      console.log('拿到失败消息')
    }
    dispatch({
      type: "login1/login",
      payload: values,
      callback: response => {
        if (response.status === "error") {
          console.log('刷新验证码')
        }
      }
    })
  }
  render() {
    const { login1 } = this.props;
    console.log('最新login1', login1)
    return (
      <div className={styles.main}>
        <Form onFinish={this.login} initialValues={{ remember: true }} >
          <Tabs>
            <Tabs.TabPane tab="账户密码登录" key="account" >
              {
                login1.status === "error" && (
                  <div>
                    <Alert message={login1.message}></Alert>
                    <br />
                  </div>
                )
              }
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input size="large" prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input type="password" size="large" prefix={<LockOutlined />} />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="手机号登录" key="mobile" >
              <Form.Item
                name="mbile"
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="code"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input type="password" size="large" />
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>自动登录</Checkbox>
          </Form.Item>
          <Button htmlType="submit" block type="primary" >登录</Button>
        </Form>
      </div>
    )
  }
}
export default Index