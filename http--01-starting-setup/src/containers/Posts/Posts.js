import React, { Component } from 'react';
import Post from '../../components/Post/Post';
import axios from '../../axios-order';
import {Route,Link} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

import './Posts.css';

class Posts extends Component{

    state = {
        posts: [],

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
                console.log(error);
            })
    }

    // to link to FullPost, you can wrap all the posts in <Link>, you can also use this.props.history.push()
    // below are two ways to sue push()
    selectPostHandler = (id) => {
        this.props.history.push({pathname: '/posts/'+id});
        // this.props.history.push('/'+id);
    }

    render(){
        // this component will receive props from <Route /> component
        console.log(this.props)
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
            <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        )
    }
    
}

export default Posts;