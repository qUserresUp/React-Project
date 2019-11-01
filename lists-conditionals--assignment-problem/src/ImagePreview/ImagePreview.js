import React, { Component } from 'react';

class ImagePreview extends Component {
    
    state={
       file: null
    }

  handleChange =(event) => {
      
      let uploadFile = null;
      if(event.target.files.length === 0){ uploadFile = null;}
      else{ uploadFile = URL.createObjectURL(event.target.files[0]); }
      this.setState({file: uploadFile});
  }

  render() {

    let image = null;
    if(this.state.file != null){ image = this.state.file; }
    return (
      <div>
        <input type="file" onChange={this.handleChange}/>
        <img src={image}/>
      </div>
    );
  }
}
export default ImagePreview;