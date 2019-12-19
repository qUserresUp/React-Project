import React, { Component } from 'react';

class Course extends Component {
    render () {
        console.log(this.props);
        
        let query = new URLSearchParams(this.props.location.search);
        let courseTitle = null;
        for(let params of query.entries()){
            courseTitle = params[1]
        }

        return (
            <div>
                <h1>{courseTitle}</h1>
                <p>You selected the Course with ID: {this.props.match.params.id}</p>
            </div>
        );
    }
}

export default Course;