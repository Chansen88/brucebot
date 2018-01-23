/** @jsx h */

import react from 'react';
import styled from 'styled-components'

const { h, render, Component } = react;

export default class Clock extends Component {
    constructor() {
        super();
        this.state.time = Date.now();
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({ time: Date.now() });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render(props, state) {
        let time = new Date(state.time).toLocaleTimeString();
        return <span>Current time {time}</span>;
    }
}