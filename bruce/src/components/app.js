/** @jsx h */
import { h, render, Component } from "react";
import styled from "styled-components";

import Header from './header';
import GifSearch from './gifSearch'

export default class App extends Component {
	render() {
		return (
            <div id="app">
                <Header />
                <GifSearch count={25}/>
            </div>
        );
	}
}

