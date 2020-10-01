import styled from '@emotion/styled'

export const Container = styled.div`
width : 100vw;
height : calc(100vh - 100px);
display: flex;
flex-wrap: wrap;
flex-direction: column;
box-sizing: border-box;

`

export const MainSpan = styled.div`
width: 50%;
height: 100%;
display : flex; 
justify-content: center;
align-items : center;
background : #8DC73D;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
transition: all 0.3s cubic-bezier(.25,.8,.25,1);
:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
  margin : 10px;
`


export const SubSpanOne = styled.div`
background : white;
height :calc(50% - 20px);
width : calc(50% - 30px);
display : flex; 
justify-content: center;
align-items : center;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
transition: all 0.3s cubic-bezier(.25,.8,.25,1);
:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
  margin-top : 10px;
  margin-bottom : 10px;
cursor : pointer;
`

export const SubSpanTwo = styled.div`
width : calc(50% - 30px);
background : gray;
display : flex; 
justify-content: center;
align-items : center;
height :calc(50% - 20px);
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
transition: all 0.3s cubic-bezier(.25,.8,.25,1);
:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
  margin-top : 10px;
cursor : pointer;

`