import React from 'react'
import { Container, LoginDiv, StyledInput, StyledButton } from './styles'
import { Link } from 'react-router-dom'
import login from '../../Assets/login.svg'
import { Form , Alert } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const Login = () => {
    const [userName, setUserName] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [errmsg, setErrmsg] = React.useState("") 

    const signin= () => {
        //console.warn()
        fetch('http://127.0.0.1:8082/api/login', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"email":userName, "password":password})
        }).then((result) => {
            result.json().then((resp) => {
               
            //    alert(resp.message === "Login Failed" ? "Incorrect password" : undefined)
               
                if(resp.email){
                    localStorage.setItem("token", JSON.stringify(resp.message))
                    localStorage.setItem("email", resp.email)
            }
            })
        })
    }
    // console.log("Error" + errmsg)
    
    return (
        <Container>
            {/* {errmsg === "Login Failed" ? <Alert message="Incorrect UserName or Password" type="error"/> : null} */}
            <LoginDiv>
                <img src={login} alt="" />
                <span>

                    <Form name="Login">
                        <label>Username</label>
                        <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!', }]}>
                            <StyledInput prefix={<UserOutlined />} onChange={(e) => {
                                setUserName(e.target.value)
                            }} />
                        </Form.Item>
                        <label>Password</label>
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                            <StyledInput prefix={<LockOutlined />} onChange={(e) => setPassword(e.target.value)} type="password" />
                        </Form.Item>
                    </Form>
                </span>
                <Link to="/home">

                    <StyledButton type="primary"  htmlType="submit" onClick={() => signin()} >Login</StyledButton>
                </Link>
                <br />
                <p style={{ textAlign: "center" }}>New to Rebit? Sign up</p>
                <Link to="/signup">
                    <StyledButton type="primary" htmlType="submit">Sign Up</StyledButton>
                </Link>

            </LoginDiv>

        </Container>
    )
}

export default Login
