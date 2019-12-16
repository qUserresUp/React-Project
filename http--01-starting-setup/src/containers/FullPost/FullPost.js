import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {

    // seems like when the componenet is unmounted, the state will reset to default
    state = {
        postContent: null
    }

    // when compnent first mount, componentDidUpdate lifecycle is not called
    componentDidMount () {
        this.loadData();
    }

    // check updates everytime props changes
    componentDidUpdate(){
        this.loadData();
    }

    loadData(){
        console.log(this.props);
        // we do not want 'www.balabala' + null, need to make sure that one post is selected
        if(this.props.match.params.id){ 
            // only update when the postConent is null or postID has changed to avoid infinite loop
            // use != to compare value: {this.props.match.params.id} is a string, {postContent.id} is a integer
            if(!this.state.postContent || (this.state.postContent && this.state.postContent.id != this.props.match.params.id)){ 

                axios.get('/posts/' + this.props.match.params.id) 
                    .then((response)=>{
                        this.setState({postContent: response.data}); // be careful, using setState() in componentDidUpdate() can create an infinite loop
                })
            }
        }
    }

    

    render () {
        let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;

        if(this.props.match.params.id){ // when we have a valid id, does not mean we have completely fetached the data
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