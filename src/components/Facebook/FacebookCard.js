import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import AddCommentsDialog from './AddCommentsDialog';
import { Card, CardText,Cell } from 'react-md';
import {observer , inject} from 'mobx-react';
import Moment from 'react-moment';
import { FontIcon } from 'react-md';

const socket = socketIOClient("http://localhost:4001");

@inject('FacebookStore')
@observer
class FacebookCard extends Component {

  componentDidMount() {
    this.props.FacebookStore.setSharedData();
  }

  setLikes = () => {
    this.props.FacebookStore.setLikes();
  }

  showCommentsDialog = () => {
    this.props.FacebookStore.showCommentsDialog();
  }

  render() {
    let {post}  = this.props.FacebookStore;

    socket.on('change',(postObj) => {
      post  = postObj;
    })

    return (
      <div>
        <Card className="md-cell md-cell--12 md-text-container">
          <CardText>
            <div style={{display:'flex'}}>
              <div style={{marginRight:'auto'}}>
                <span style={{fontSize:"3em"}}>
                  <FontIcon iconClassName="fa fa-user-circle" />
                </span>
                <span style={{color:"grey"}}>
                  <Moment fromNow>{post.postTimeLine}</Moment>
                </span>
              </div>
            </div>
            <div style={{textAlign: 'left'}}>
              <span style={{color:"grey"}}>
                {post.message}
              </span>
            </div>
            <div style={{display:'flex',borderBottom: '2px solid white'}}>
              <button style={{cursor:'pointer',border:'0px',background:"#eee",marginRight:"8px"}}
                onClick={() => this.setLikes()}>
                <span style={{color:"#3f63b5"}}>
                  Like
                </span>
              </button>
              <button style={{cursor:'pointer',border:'0px',background:"#eee"}}
                onClick={() => this.showCommentsDialog()}>
                <span style={{color:"#3f63b5"}}>
                  Comment
                </span>
              </button>
            </div>

            <div style={{textAlign: 'left',background:"#eee",borderBottom: '2px solid white'}}>
              <span style={{fontSize:"1.5em"}}>
                <FontIcon iconClassName="fa fa-thumbs-up" />
              </span>
              <span style={{color:"grey"}}>
                {post.likes} people like this
              </span>
            </div>

            {post.comments.map(({commentName,commentTimeLine }) => (
              <div key={commentName} className="md-grid md-full-width" style={{display:'flex',background:'#eee',borderBottom: '2px solid white'}}>
                <Cell size={8} style={{textAlign:'left'}}>
                  <span style={{fontSize:"1.5em"}}>
                    <FontIcon iconClassName="fa fa-user-circle" />
                  </span>
                  <span style={{color:"grey"}}>
                    {commentName}
                  </span>
                </Cell>
                <Cell size={4} style={{textAlign:'right'}}>
                  <span style={{color:"grey"}}>
                    <Moment fromNow>{commentTimeLine}</Moment>
                  </span>
                </Cell>
              </div>
            ))}
          </CardText>
        </Card>
        <AddCommentsDialog/>
      </div>
    )
  }
}
export default FacebookCard;
