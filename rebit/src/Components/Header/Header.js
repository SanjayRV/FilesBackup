import React from 'react'
import { StyledHeader, Content, StyledText, ModalText, ModalColumn } from './styles'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../Assets/logo.svg'
import user from '../../Assets/user.svg'
import { Modal } from 'antd'
const Header = () => {
    const [modal, setModal] = React.useState(false)
    const [data, setData] = React.useState({})

    const profile = () => {
        fetch('http://127.0.0.1:8000/api/dashboard/userDetails?email=' + localStorage.getItem('email') + ' ', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        }).then((result) => {
            result.json().then((resp) => {
                setData({
                    username: resp[0].username,
                    email: resp[0].email,
                    subscription_plan: resp[0].subscription_plan,
                    subscription_from: resp[0].subscription_from,
                    subscription_to: resp[0].subscription_to
                })

            })
        })
    }
    React.useEffect(() => {
        profile()
    }, [])


    return (
        <>
            <StyledHeader>
                <Content>
                    <Link to="home">
                        <img src={logo} alt="" />
                    </Link>
                    <img src={user} alt="" onClick={() => { setModal(true) }} style={{ cursor: 'pointer' }} />


                    <StyledText><NavLink activeStyle={{ color: "#8DC73D" }} style={{ color: "gray" }} to="/files">
                        Files
                    </NavLink></StyledText>
                    <StyledText><NavLink activeStyle={{ color: "#8DC73D" }} style={{ color: "gray" }} to="/report">
                        Report
                        </NavLink></StyledText>
                    <StyledText > <NavLink activeStyle={{ color: "#8DC73D" }} style={{ color: "gray" }} to="/recycle"> Recycle Bin</NavLink></StyledText>
                    <StyledText onClick={() => localStorage.clear()}> <NavLink activeStyle={{ color: "gray" }} style={{ color: "gray" }} to="/"> Logout </NavLink> </StyledText>


                </Content>
            </StyledHeader>

            <Modal visible={modal} footer={null} width={700} onCancel={() => setModal(false)} > <div style={{ marginTop: "25px"  ,margin : "30px"}}>


                <ModalText>
                    <span style={{color : 'gray' , marginRight : "10px"}}>
                        <p>Username </p>            
                       <p>Subscription-Plan </p> 
                        <p>Subscription Began on </p>
                        <p>Subscription Ends on</p> 
</span> 
<span >
    
<p>: {data.username} </p>
<p>: {data.subscription_plan} </p>
<p>: {data.subscription_from}</p>
<p>: {data.subscription_to}</p>
</span>

                </ModalText>
                



        </div></Modal >
        </>
    )
}

export default Header
