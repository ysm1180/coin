import React, { Component } from 'react';
import { MyInfoWrapper } from '../../components';
import * as service from '../../services/myinfo';

class MyInfoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coinone: {
                krw: 0
            }
        };
    }

    componentDidMount() {
        this.fetchCoinoneMyInfo();
    }

    fetchCoinoneMyInfo = async () => {
        const post = await service.getBalance();
        const coinone = Object.assign({}, this.state.coinone);
        coinone.krw = post.data.krw.avail;
        this.setState({
            coinone
        });
    }
    
    render() {
        return (
            <MyInfoWrapper krw={this.state.coinone.krw}>
            </MyInfoWrapper>
        );
    }
}

export default MyInfoContainer;