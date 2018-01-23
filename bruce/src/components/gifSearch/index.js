import  { h, render, Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ButtonSet = styled.div`
    margin: 10px;
`;

const Input = styled.input`
    font-family: "Fairview";
    font-size: 1em;
    background: lightgrey;
    padding: 0.25em .5em;
    border-radius: 3px 0 0 3px;
    border-width: 0;
`;

const Button = styled.button`
    font-family: "Fairview";
    color: white;
    background: #39065a;
    font-size: 1em;
    padding: 0.25em 1em;
    border-radius: 0 3px 3px 0;
    border-width: 0;
`;

const Img = styled.img`
    margin: 5px;
    border-radius: 5px;
    &:hover {
        cursor: pointer;
        filter: grayscale(1);
    }
`;

export default class GifSearch extends Component {
    constructor() {
        super();
        this.state.search = '';
        this.state.urls = [];
        this.getGifs = this.getGifs.bind(this);
        this.postGif = this.postGif.bind(this);
    }

    componentDidMount() {

    }

    getGifs() {
        const search = this.textInput.base.value.trim();
        this.setState({search});
        const { count } = this.props;
        axios
          .post(`/gifs`, { count, search })
          .then(res => {
            const { data } = res;
            this.setState({ urls: data });
          })
          .catch(err => {
            console.error({ err });
            throw err;
          });
    }

    postGif(e) {
        const text = e.target.currentSrc;
        axios
          .post(`/bot`, { text })
          .then(res => {
            const { data } = res;
            console.log(text);
          })
          .catch(err => {
            console.error({ err });
            throw err;
          });
    }

    render(props, state) {
        const { search, urls } = state;
        return (
            <div>
                <Container>
                    <ButtonSet>
                        <Input ref={input => (this.textInput = input)} type="text" value={search} placeholder="Search..." />
                        <Button onClick={this.getGifs}>Search</Button>
                    </ButtonSet>
                </Container>
                <Container>
                    {urls.map((url) => <Img src={url} onClick={this.postGif}/>)}
                </Container>
            </div>
        );
    }
}

GifSearch.protoTypes = {
  count: PropTypes.number.isRequired
};