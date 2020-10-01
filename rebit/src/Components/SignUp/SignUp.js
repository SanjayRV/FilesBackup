import React from 'react'
import signup from '../../Assets/logo.svg'
import { Form, Select, Alert } from 'antd'
import { Link } from 'react-router-dom'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Container, StyledInput, StyledSelect, StyledButton } from './styles'
const SignUp = () => {

    const [userName, setUserName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [subscription_plan, setplan] = React.useState("")
    const [password, setpassword] = React.useState("")
    const [errmsg, setErrmsg] = React.useState("")

    const register = () => {
        fetch('http://127.0.0.1:8082/api/createUser', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "username": userName, "email": email, "password": password, "subscription_plan": subscription_plan })
        }).then((result) => {
            result.json().then((resp) => {
                if (resp.message === "User Created") {
                    console.log(resp.message)
                    localStorage.setItem("auth", JSON.stringify(resp.message))
                    localStorage.setItem("email", email)

                }
            })
        })
    }

    const { Option } = Select
    console.log("data :" + userName, email, subscription_plan, password)
    return (
        <Container>
            {errmsg === "Email Exists" ? <Alert message="Incorrect UserName or Password" type="error" /> : null}
            <img height="70px" src={signup} alt="" />
            <Form>
                <label>Username</label>
                <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!', }]}>
                    <StyledInput size="medium" onChange={(e) => setUserName(e.target.value)} prefix={<UserOutlined />} />
                </Form.Item>
                <label>Email</label>
                <Form.Item name="Email" onChange={(e) => setEmail(e.target.value)} rules={[{ required: true, message: 'Please input a valid Email!', type: "email" }]}>
                    <StyledInput size="medium" prefix={<MailOutlined />} />
                </Form.Item>
                <label>Password</label>
                <Form.Item name="password" onChange={(e) => setpassword(e.target.value)} rules={[{ required: true, message: 'Please input your Password!' }]}>
                    <StyledInput type="password" size="medium" prefix={<LockOutlined />} />
                </Form.Item>
                <label>Subscription Plan </label>
                <Form.Item name="Select">

                    <StyledSelect size="medium" onChange={(e) => setplan(e)} >
                        <Option value="Platinum">Platinum</Option>
                        <Option value="Gold">Gold</Option>
                        <Option value="Silver">Silver</Option>
                    </StyledSelect>
                </Form.Item>
                <Form.Item name="Button">
                    <span style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <Link style={{ width: "100%" }} to="/home">
                            <StyledButton type="primary" htmlType="submit" onClick={() => register()} > SignUp</StyledButton>
                        </Link>
                        <br />
                        <p style={{ textAlign: "center" }}>Already a member? Sign in</p>
                        <Link style={{ width: "100%" }} to="/">
                            <StyledButton type="primary" htmlType="submit">Login</StyledButton>
                        </Link>
                    </span>

                </Form.Item>
            </Form>
        </Container>
    )
}

export default SignUp
