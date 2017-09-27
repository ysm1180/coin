import React, { Component } from 'react';
import { PostWrapper } from '../../components';
import * as service from '../../services/balance';

class PostContainer extends Component {
    componentDidMount() {
        this.fetchPostInfo();
    }

    fetchPostInfo = async () => {
        const post = await service.getBalance();
        console.log(post);
    }
    
    render() {
        return (
            <PostWrapper>
                
            </PostWrapper>
        );
    }
}

export default PostContainer;