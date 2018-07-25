import React, { Component } from 'react';
import {TextField,Button, DialogContainer, Toolbar } from 'react-md';
import {observer , inject} from 'mobx-react';

@inject('FacebookStore')
@observer
export default class AddCommentsDialog extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const newComment = this.parseNewComments(e,this.props.FacebookStore);
    if(newComment){
      this.props.FacebookStore.postCommentData(newComment);
    }
  };

  onHide = () =>{
    this.props.FacebookStore.addDialogVisible = false;
  }

  parseNewComments = (e) => [].reduce.call(e.target.elements, (commentData, el) => {
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
    let {addDialogVisible } = this.props.FacebookStore;

    return (

      <DialogContainer
          id="simple-list-dialog"
          visible={addDialogVisible}
          title="Simple List Dialog"
          onHide={this.onHide}
        >
          <Toolbar
            title="add comment"
            titleId="add-comment-dialog-title"
            fixed
            colored
          />
          <form onSubmit={this.handleSubmit} className="md-grid" style={{paddingTop:"2vh"}} aria-labelledby={`comment-group-title`}>
            <TextField
              id='commentName'
              name={`commentName`}
              label="Comment"
              customSize="title"
              defaultValue=""
              placeholder="Comment"
            />
            <Button raised primary className="md-full-width"  type="submit">Submit</Button>
          </form>
        </DialogContainer>
    );
  }
}
