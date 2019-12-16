import React from 'react'
import styled from 'styled-components'

const Container = styled.footer`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
    color: #fefefe;
    margin-top: 30px;

    & p {
        text-align: center;
        font-size: 1rem;
        margin: 0;
    }
`

export default function Footer() {
    return (
        <Container>
            <p>maxime.jeannette@outlook.fr</p>
        </Container>
    )
}