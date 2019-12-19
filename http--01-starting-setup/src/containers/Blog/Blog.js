import React, { Component } from 'react';
import {Route, Link, NavLink, Switch, Redirect} from 'react-router-dom'; 
import Posts from '../Posts/Posts';
// import NewPost from '../NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
import './Blog.css';

/* 
    lazy loading 
*/
const AsyncComponent = asyncComponent(()=> {
    return import('../NewPost/NewPost');
})

/*
    after react 16.6
    can also use React.lazy() method + <Suspense fallback={'JSX code'} /> component

    const posts = React.lazy(()=> (import('../NewPost/NewPost')))
    <Suspense fallback={<div> Loading </div>}>
        <Posts />
    </Suspense>
*/


class Blog extends Component {

    state = {
        auth: true,
    }

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

                                <Link /> component 'to' attribute is an absolute path, not a relative path
                                use props.this.match.url + '/newPost' to use relative path

                                NavLink is similar to Link, but you can apply styling to NavLink
                                the default 'activeClassName' is 'active'
                                use activeClassName or activeStyle attributes to edit styling

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
                    
                    use 'component' attribute to render components
                    use <Switch/> component from 'react-router-dom' to render the first matched route
                    use <Redirect/>> component from 'react-router-dom' to redirect
                */}
                <Switch>
                    
                        
                    {/* Guards */}
                    {this.state.auth ? <Route path='/newPost' component={AsyncComponent} />:null}  ]
                    <Route path='/posts'  component={Posts} />
                    <Redirect from='/' to='/posts' />
                    {/* Catches all paths
                        <Route render={()=><h1>Not Found</h1>} /> 
                    */}
                </Switch>

            </div>
        );
    }
}

export default Blog;