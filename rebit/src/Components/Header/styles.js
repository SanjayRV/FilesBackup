import styled from "@emotion/styled"
import { Button } from 'antd'
export const StyledHeader = styled.div`
height : 80px;
display : flex;
align-items : center ;
justify-content : space-around;
background: white;
border : solid 10px gray;

`

export const Content = styled.div`
width : 90%;   
display : flex; 
justify-content : space-between;
align-items : center;
`

export const StyledText = styled.span`
font-size : 1rem;
font-weight : 600;
font-family : Roboto;
color : gray;
:hover{
    color : green;
}
cursor : pointer;
`

export const DeleteText = styled.span`
color : red;
cursor : pointer;
`

export const RestoreText = styled.span`
color : Blue;
cursor : pointer;
`


export const FileSpan = styled.div`
display : flex;
justify-content : space-between;
width : 30vw;
`

export const FileDiv = styled.div`
display : flex;
justify-content : center;
flex-direction : column;
align-items : center;

`

export const UploadSpan = styled.div`

`

export const ModalText = styled.span`
color : #8DC73D ;
font-weight : 600;
font-size : 24px;
display : flex;
flex-direction : row;
align-items : center;
justify-content : flex-start ;
`

