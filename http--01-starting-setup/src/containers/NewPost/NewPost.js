import React, { Component } from 'react';

import './NewPost.css';
import axios from 'axios';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max'
    }

    // send post request
    postRequestHandler = () =>{
        let post = { ...this.state };
        axios.post('/posts',post) // send post request to the dummy server
            .then((response)=>{
                console.log(response);
                this.props.history.replace('/'); // replace() replace current page with specified page without adding current page to history
                //this.props.history.push('/'); // push() push the specified page to the top of history stack
            })
    }


    postDeleteHandler = () =>{
        let post = { ...this.state };
        axios.delete('/posts',post) // send post delete request to the dummy server
            .then((response)=>{
                console.log(response);
            })
    }

    render () {
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => {this.setState({title: event.target.value})}} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postRequestHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;