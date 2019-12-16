import React, { Component } from 'react';
import Posts from '../Posts/Posts';
import NewPost from '../NewPost/NewPost';
import {Route, Link, NavLink, Switch, Redirect} from 'react-router-dom'; 
import './Blog.css';

class Blog extends Component {

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/* 
                                use Link component from react-router-dom instead of <a> tag to prevent 
                                website from sending new request to server and reloading itself
                                leading to loss of state

                                <Link /> component 'to' attribute is ab absolute path, not a relative path
                                use props.this.match.url + '/newPost' to use relative path

                                NavLink is similar to Link, but you can apply styling to NavLink
                                use activeClassName or activeStyle attributes to add styling

                            */}
                            <li><NavLink to="/posts" 
                            exact
                            activeClassName="my-active"
                            activeStyle={{
                                color: '#fa923f',
                                textDecoration: 'underline',
                            }}
                            >Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/newPost',
                                hash:'#submit',
                                search: '?quick-submit=true',

                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* use exact to specify wether the path is exact or not*/}
                {/* 
                    use render attribute to render small content quickly
                    <Route path='/' exact render={()=><p>random text</p>} /> 
                    
                    use component attribute to render components
                    use switch component from 'react-router-dom' to render the first matched route
                */}
                <Switch>
                    <Route path='/newPost' component={NewPost} />
                    <Route path='/posts'  component={Posts} />
                    <Redirect from='/' to='/posts' />
                </Switch>

            </div>
        );
    }
}

export default Blog;