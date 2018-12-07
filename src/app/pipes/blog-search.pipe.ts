import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'blogSearchPipe' })
export class BlogSearchPipe implements PipeTransform {
  transform(blogs: any[], searchText: string): any {
    if (!searchText) { return blogs; }
    return blogs.filter(function(blog) {
      return blog.title.indexOf(searchText) !== -1;
    });
  }
}
