import React, { Component } from 'react';
import {TextField,Button, DialogContainer, Toolbar } from 'react-md';
import {observer , inject} from 'mobx-react';

@inject('FacebookStore')
@observer
export default class AddPostDialog extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const newPost = this.parseNewPosts(e,this.props.FacebookStore);
    if(newPost){
      this.props.FacebookStore.postPostData(newPost);
    }
  };

  onHide = () =>{
    this.props.FacebookStore.addPostDialogVisible = false;
  }

  parseNewPosts = (e) => [].reduce.call(e.target.elements, (commentData, el) => {
    const { name, value } = el;
    if (!name) { // buttons
      return commentData;
    }
    else{
      commentData[name] = value;
    }
    return commentData;
  }, {});


  render() {
    let {addPostDialogVisible } = this.props.FacebookStore;

    return (

      <DialogContainer
          id="simple-post-dialog"
          visible={addPostDialogVisible}
          title="Simple Post Dialog"
          onHide={this.onHide}
        >
          <Toolbar
            title="add post"
            titleId="add-post-dialog-title"
            fixed
            colored
          />
          <form onSubmit={this.handleSubmit} className="md-grid" style={{paddingTop:"2vh"}} aria-labelledby={`post-group-title`}>
            <TextField
              id='postName'
              name={`postName`}
              label="Post"
              customSize="title"
              defaultValue=""
              placeholder="Post"
            />
            <Button raised primary className="md-full-width"  type="submit">Submit</Button>
          </form>
        </DialogContainer>
    );
  }
}
