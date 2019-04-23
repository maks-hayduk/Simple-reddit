import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data/data.service';
import { ShareDataService } from 'src/app/shared/services/ShareData/share-data.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  data: any;
  commentFullWindow: boolean;
  commentId: string;
  createPost: boolean;

  postTopic: string;
  postTitle: string;
  postText: string;
  username: string;
  commentInput: string;
  loggined: boolean;
  searchedInput: string;

  areYouSure: boolean;
  deletedPostIndex: number;
  deletePost: boolean;
  postuser: boolean;

  userPostsUn: any;
  constructor(private dataService: DataService, private shareData: ShareDataService) {
    this.getPosts();
  }
  ngOnInit() {
    this.shareData.currentMessage.subscribe(data => this.createPost = data);
    this.shareData.userName.subscribe(data => this.username = data);
    this.shareData.ifLoggined.subscribe(data => this.loggined = data);
    this.shareData.search.subscribe(data => this.searchedInput = data);
    // this.logginedAndUser = this.loggined;
    this.shareData.post.subscribe(data => this.postuser = data);
  }
  public delPost(i: number): void {
    this.areYouSure = true;
    this.deletedPostIndex = i;
    this.deletePost = true;
  }
  public delPostPost(i: number): void {
    let temp = this.data.filter(a => a.author === this.username);
    this.areYouSure = true;
    this.deletedPostIndex = this.data.map(a => a.id).indexOf(temp[i].id);
    this.deletePost = true;
  }
  public foundUser(i: number): boolean {
    let postUser = this.data[i].author;
    if(this.username === postUser) {
      return false;
    }
    return true;
  }
  public areYouSureToDelete(): void {
    let postId = this.data[this.deletedPostIndex].id;
    this.dataService.delPost(postId).subscribe(() => {
      this.getAllPosts();
    });
    let rem = [];
    rem = this.data.splice(this.deletedPostIndex,1);
    this.areYouSure = false;
    this.commentFullWindow = false;
    this.deletePost = false;
    this.userPostsUn = this.data.filter(a => a.author === this.username);
  }
  public cancelSure(): void {
    this.areYouSure = false;
    this.deletePost = false;
  }
  public commentWindow(i: any): void {
    this.commentFullWindow = true;
    this.commentId = i;
  }
  public commentWindowPost(i: any): void {
    let temp = this.data.filter(a => a.author === this.username);
    this.commentFullWindow = true;
    this.commentId = this.data.map(a => a.id).indexOf(temp[i].id);
  }
  public closeCommentWindow(): void {
    this.commentFullWindow = false;
  }
  public cancelCreatingPost(): void {
    this.shareData.changeMessage(false);
    this.shareData.changeLogin(true);
    this.postTopic = '';
    this.postText = '';
    this.postTitle = '';
  }
  public voteUp(i: number): void {
    let post = this.data[i];
    console.log(this.username);
    if(!post.upVoted.includes(this.username)) {
      post.rating++;
      post.upVoted.push(this.username);
      let index = post.downVoted.indexOf(this.username);
      if(post.downVoted.includes(this.username) && index > -1) {
        post.rating++;
        post.downVoted.splice(index,1);
      }
      this.dataService.updatePost(post).subscribe(() => {
        this.getAllPosts();
      });
    }
  }
  public voteDown(i: number): void {
    let post = this.data[i];
    if(!post.downVoted.includes(this.username)) {
      post.rating--;
      post.downVoted.push(this.username);
      let index = post.upVoted.indexOf(this.username);
      if(post.upVoted.includes(this.username) && index > -1) {
        post.rating--;
        post.upVoted.splice(index,1);
      }
      this.dataService.updatePost(post).subscribe(() => {
        this.getAllPosts();
      });
    }
  }
  public pushComment(): void {
    let post = this.data[this.commentId];
    let comObj = {
      commentator: this.username,
      time: new Date().toLocaleString(),
      commentText: this.commentInput
    };
    post.comments.unshift(comObj);
    this.dataService.updatePost(post).subscribe(() => {
      this.getAllPosts();
    });
    this.commentInput = '';
    this.userPostsUn = this.data;
  }
  public postPots(): void {
    let postObj = {
      id: uuid(),
      topic: this.postTopic,
      author: this.username,
      title: this.postTitle,
      postText: this.postText,
      rating: 0,
      time: new Date().toLocaleString(),
      img: '',
      upVoted: [],
      downVoted: [],
      comments: []
    };
    this.dataService.addPost(postObj).subscribe(() => {
      this.getAllPosts();
    });
    this.data.unshift(postObj);
    this.shareData.changeMessage(false);
    this.shareData.changeLogin(true);
    this.postTopic = '';
    this.postText = '';
    this.postTitle = '';
    this.userPostsUn = this.data;
  }
  private getPosts(): void {
    this.dataService.getPosts().subscribe(
      data => {
        this.data = data;
        this.data.reverse();
        this.userPostsUn = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  private getAllPosts(): void {
    this.dataService.getPosts().subscribe(
      data => {
        return data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
