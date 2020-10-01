import styled from '@emotion/styled'
import {Input , Select ,Button} from 'antd'

export const Container = styled.div`
width : 100%;
display : flex;
justify-content : center;
flex-direction : column;
align-items : center;
height : 100vh;
`

export const StyledInput = styled(Input)`
width : 220px;
`
export const StyledSelect = styled(Select)`
width : 220px;
`
export const StyledButton = styled(Button)`
width : 100%;
border-radius : 6px;
background-color: #8DC73D;
border: none;
color: white;
font-weight: 600;
:hover {
    color:black;
    background-color: #8DC73D;
}
`
