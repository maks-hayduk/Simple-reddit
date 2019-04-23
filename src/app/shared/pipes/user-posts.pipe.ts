import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userPosts'
})
export class UserPostsPipe implements PipeTransform {

  transform(data: any, userName: string): any {
    if (userName === 'undefinedUser') {
      return data;
    }
    return data.filter(a => a.author === userName);
  }

}
