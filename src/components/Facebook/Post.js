import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import AddPostDialog from './AddPostDialog';
import Facebook from './Facebook';
import { Card, CardText } from 'react-md';
import {observer , inject} from 'mobx-react';
const socket = socketIOClient("http://localhost:4001");

@inject('FacebookStore')
@observer
class Post extends Component {
  showPostDialog = () => {
    this.props.FacebookStore.showPostDialog();
  }

  render() {
    let {post}  = this.props.FacebookStore;

    return (
      <div>
        <Card className="md-cell md-cell--12 md-text-container">
          <CardText>
            {!post.showPostContent && <div>
              <button style={{cursor:'pointer',border:'0px',background:"#eee"}}
                onClick={() => this.showPostDialog()}>
                <span style={{color:"#3f63b5"}}>
                  Add Post
                </span>
              </button>
            </div>}
            {post.showPostContent && <div>
              <Facebook/>
            </div>}
          </CardText>

        </Card>
        <AddPostDialog/>
      </div>
    )
  }
}
export default Post;
