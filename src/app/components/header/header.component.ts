import {Component, ElementRef, OnInit} from '@angular/core';
import { DataService } from 'src/app/shared/services/data/data.service';
import { ShareDataService } from 'src/app/shared/services/ShareData/share-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  siteName = 'Avocaduu';
  signInShown: boolean;
  signUpShown: boolean;
  formSignUp: boolean = true;
  formSignUpNext: boolean;
  users: any;
  usernameInput: string;
  passwordInput: string;
  emailInput: string;
  logInUsername: string;
  logInPassword: string;
  found: boolean;
  visableUser = false;
  username: string;
  ifloggined: boolean;
  userNameExists: boolean;
  emailNameExists: boolean;
  search: string;

  k = true;
  options: boolean;
  temp: boolean;
  key = true;
  constructor(private dataService: DataService, private shareData: ShareDataService) {
    this.getUsers();
  }
  ngOnInit() {
    this.shareData.ifLoggined.subscribe(data => this.ifloggined = data);
    this.shareData.userName.subscribe(data => this.logInUsername = data);
    this.shareData.search.subscribe(data => this.search = data);
    this.shareData.post.subscribe(data => this.temp);
  }
  public myPostUser(): void {
    if(this.key){
      this.shareData.changePost(true);
      this.key = false;
    }
    else {
      this.shareData.changePost(false);
      this.key = true;
    }

  }
  public onfocusout(): void {
    this.options = false;
    this.k = true;
  }
  public openOptions(): void {
    if(this.k) {
      this.options = true;
      this.k = false;
    }
    else {
      this.options = false;
      this.k = true;
    }
  }
  public onKey(event: any) { // without type info
    this.shareData.changeSearch(event.target.value);
    console.log(this.search);
  }
  public logInFormShown(): void {
    this.signInShown = true;
    this.logInUsername = '';
  }
  public signUpFormShown(): void {
    this.signUpShown = true;
  }
  public closeScreen(): void {
    this.signInShown = false;
    this.signUpShown = false;
    this.formSignUpNext = false;
    this.formSignUp = true;
  }
  public nextForm(): void {
    let arr = this.users.filter(a => a.email === this.emailInput)
    if(arr.length === 0)
    {
      this.formSignUp = false;
      this.formSignUpNext = true;
      this.emailNameExists = false;
    }
    else {
      this.emailNameExists = true;
    }
  }
  public backToFormSignUp(): void {
    this.formSignUp = true;
    this.formSignUpNext = false;
  }
  public signIn(): void {
    this.found = false;
    for ( let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === this.logInUsername && this.users[i].password === this.logInPassword) {
        this.found = true;
        this.shareData.changeLogin(true);
        this.shareData.changeUserName(this.logInUsername);
        break;
      }
    }
    if (this.found) {
      this.visableUser = true;
      this.signInShown = false;
      this.username = this.logInUsername;
      this.logInPassword = '';
      this.logInUsername = '';
    }
  }
  public logOutUser(): void {
    this.username = '';
    this.visableUser = false;
    this.shareData.changeUserName('undefinedUser');
    this.shareData.changeLogin(false);
    this.logInUsername = 'undefinedUser';
  }
  public addUserToJson(): void {
    let arr = this.users.filter(a => a.username === this.usernameInput)
    if(arr.length === 0)
    {
      const user = {
        id: this.users.length + 1,
        username: this.usernameInput,
        password: this.passwordInput,
        email: this.emailInput
      };
      this.dataService.addUser(user).subscribe(() => {
        this.getAllUsers();
      });

      this.users.push(user);
      this.shareData.changeUserName(this.usernameInput);
      this.shareData.changeLogin(true);
      this.username = this.usernameInput;
      this.usernameInput = '';
      this.passwordInput = '';
      this.emailInput = '';
      this.signUpShown = false;
      this.visableUser = true;
      this.userNameExists = false;
    }
    else{
      this.userNameExists = true;
    }
  }
  private getUsers(): void {
    this.dataService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  private getAllUsers(): void {
    this.dataService.getUsers().subscribe(
      data => {
        return data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
