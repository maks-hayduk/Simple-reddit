import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private messageSource = new BehaviorSubject<boolean>(null);
  currentMessage = this.messageSource.asObservable();

  private ifLogginedUser = new BehaviorSubject<boolean>(null);
  ifLoggined = this.ifLogginedUser.asObservable();

  private usernameSource = new BehaviorSubject<string>('undefinedUser');
  userName = this.usernameSource.asObservable();

  private searchSource = new BehaviorSubject<string>('');
  search = this.searchSource.asObservable();

  private myPosts = new BehaviorSubject<boolean>(null);
  post = this.myPosts.asObservable();

  constructor() { }
  changeMessage(message: boolean) {
    this.messageSource.next(message);
  }
  changeLogin(log: boolean) {
    this.ifLogginedUser.next(log);
  }
  changeUserName(user: string) {
    this.usernameSource.next(user);
  }
  changeSearch(s: string) {
    this.searchSource.next(s);
  }
  changePost(p: boolean) {
    this.myPosts.next(p);
  }
}
