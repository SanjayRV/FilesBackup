import React from 'react'
import {Container , MainSpan ,SubSpanOne ,SubSpanTwo} from './styles'
import {Link ,useHistory} from 'react-router-dom'
import Header from '../Header/Header'

const HomePage = ()=> {
const history = useHistory();

    return (
        <div>
            <Header/>
            <Container>
                <MainSpan>
                <h1 style={{color : '#ffffff'}}>
                We have got your files Backed Up. Bit by Bit.

            </h1>
                </MainSpan>
                
            <SubSpanOne onClick={()=>{history.push('/files')}}>    
        <h2 style={{color : 'gray'}}>
               Upload your files here

            </h2>
                    
        </SubSpanOne>
 
      
        <SubSpanTwo onClick={()=>{history.push('/report')}} >
        <h2 style={{color : '#8DC73D'}}>
                Check your reports here
        </h2>
        </SubSpanTwo>

                
            </Container>
        </div>
    )
}

export default HomePage
