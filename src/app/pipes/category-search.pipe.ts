import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'categorySearchPipe' })
export class CategorySearchPipe implements PipeTransform {
  transform(categories: any[], searchText: string): any {
    if (!searchText) { return categories; }
    return categories.filter(function(category) {
      return category.name.indexOf(searchText) !== -1;
    });
  }
}
