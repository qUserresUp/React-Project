import React from 'react';

// use Context API to help pass props from component A to component D directly, without going through in-between components
// all the components wrapped by this component will have access to elements in this component

// advanced: static contextType

/*
    usage:
        <AuthContext.Consumer>
        {
          (context)=> {
              context.balabala
          }
        }
        </AuthContext.Consumer>
*/

const authContext = React.createContext({
    // initialization is not necessary, just for IDE auto-complete purpose
    authenticated:false, 
    login: ()=>{}
});

export default authContext;