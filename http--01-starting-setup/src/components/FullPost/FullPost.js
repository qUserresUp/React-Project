import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {

    state = {
        postContent: null
    }

    componentDidUpdate () {

        // we do not want 'www.balabala' + null
        if(this.props.selectedPostId){ 
            // only update when the postContent is null or postID has changed to avoid infinite loop
            if(!this.state.postContent || (this.state.postContent && this.state.postContent.id !== this.props.selectedPostId)){ 

                axios.get('/posts/' + this.props.selectedPostId) 
                    .then((response)=>{
                        this.setState({postContent: response.data}); // be careful, using setState() in componentDidUpdate() can create an infinite loop
                })
            }
        }   
    }

    render () {
        let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;

        if(this.props.selectedPostId){ // when we have a valid id, does not mean we have completely fetached the data
            post = <p style={{textAlign: "center"}}>Loading...</p> 
        }

        if(this.state.postContent){ // make sure the data is fetched before accessing it
            post = (
                <div className="FullPost">
                <h1>{this.state.postContent.title}</h1>
                <p>{this.state.postContent.body}</p>
                <div className="Edit">
                    <button className="Delete">Delete</button>
                </div>
            </div>
            )
        }

        return post;
    }
}

export default FullPost;