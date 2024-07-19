import React from 'react'
import styled from 'styled-components'
import { Button } from './styles/Button'
import { NavLink } from 'react-router-dom'

const Error = () => {
  return (
    <Wrapper>
      <div className='container'>
        <div>
          <h2>404</h2>
          <h3>UH OH! You're Lost</h3>
          <p>
            The page you are looking for does not exist.HOw you got here is mystery.
            But you can click the button below to go back to homepage.

          </p>
          <NavLink to="/">
          <Button>Go Back to Home</Button>

          </NavLink>
          
        </div>

      </div>


    </Wrapper>
  )
}

const Wrapper=styled.section`
.container{
padding:9rem 0;
text-align:center;


h2{
font-size:6rem;
}

h3
{
font-size:4rem;
}

p{
margin:2rem 0;
}
}
`
export default Error