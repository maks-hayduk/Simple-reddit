import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data: any, searchText: string): any {
    if ( !searchText) {
      return data;
    }
    return data.filter(a => a.topic.toLowerCase() === searchText.toLowerCase());
  }

}
