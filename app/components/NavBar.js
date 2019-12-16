import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    background: black;
    color: #fefefe;
    margin-bottom: 30px;

    & p {
        font-size: 1rem;
        font-weight: bold;
        margin-left: 5%;
        text-transform: uppercase;
    }
`

export default function NavBar() {
    return (
        <Container>
            <p>maxime jeannette</p>
        </Container>
    )
}