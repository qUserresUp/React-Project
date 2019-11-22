import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount (){
        // because javascript execute code asynchronously, use then() promise function to make sure the data if fetched and stored
        axios.get('/posts')
            .then((response) => {
                    let updateData = response.data.slice(0,4);
                    updateData = updateData.map((eachData)=>{
                        return {
                            ...eachData,
                            author: "Max"
                        }
                    })
                    this.setState({posts: updateData});
                    
                }
            )
            // use catch() to catch errors
            .catch((error)=>{
                this.setState({error: true});
            })
    }

    selectPostHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {

        let posts = <p style={{textAlign:'center'}}>Wrong Requests</p>
        if(!this.state.error){
            posts = this.state.posts.map((post)=>(
                <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author} 
                    clicked={()=>this.selectPostHandler(post.id)}
                />
            ))
        }
        
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost selectedPostId={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;