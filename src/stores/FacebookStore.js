import { observable  , action } from "mobx";
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:4001");

class FacebookStore {

  constructor() {
    this.loadInitialData();
  }

  @observable addDialogVisible = false;
  @observable addPostDialogVisible = false;
  @observable post = {
     message:"",
     comments:[],
     likes:0,
     shares:0,
     showPostContent:false,
     postTimeLine :""
  }

  @action loadInitialData = () => {
    if(window.localStorage.getItem("postData")){
      this.post = JSON.parse(window.localStorage.getItem("postData"));
    }
  }

  @action setSharedData = () => {
    socket.on('change',(postObj) => {
      this.post  = postObj;
    })
  }

  @action postCommentData = (data) => {
    var d = new Date();
    data.postTimeLine = d.toUTCString();
    this.post.comments.splice(0,0,data);
    this.addDialogVisible = false;
    socket.emit('change', this.post);
    window.localStorage.setItem("postData", JSON.stringify(this.post));
  }

  @action postPostData = (data) => {
    var d = new Date();
    this.post.postTimeLine = d.toUTCString();
    this.post.message = data.postName;
    this.addPostDialogVisible = false;
    this.post.showPostContent = true;
    socket.emit('change', this.post);
    window.localStorage.setItem("postData", JSON.stringify(this.post));
  }

  @action setLikes = () => {
    this.post.likes++;
    socket.emit('change', this.post);
    window.localStorage.setItem("postData", JSON.stringify(this.post));
  }

  @action showCommentsDialog = () => {
    this.addDialogVisible = true;
  };

  @action showPostDialog = () => {
    this.addPostDialogVisible = true;
  };

}

export default new FacebookStore();
