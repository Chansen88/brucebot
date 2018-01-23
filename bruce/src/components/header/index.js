import { h, render, Component } from 'react';
import styled from "styled-components";

const Header = styled.header`
    display: block;
    background-image: linear-gradient(to top right, #6a0572, #39065a);
`;

const Logo = styled.h1`
    margin: 0;
    padding: 5px 20px;
    color: white;
    font-family: "Fairview";
    font-size: 2.5em;
`;

export default () => {
    return (
        <Header>
            <Logo>BruceBot</Logo>
        </Header>
    );
}