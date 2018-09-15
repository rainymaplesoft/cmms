import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOut'
})

export class FilterOutPipe implements PipeTransform {
  transform(items: any[], field: string, values: any[], self?: any): any[] {
    if (!items) {
      return []
    };
    const result = items.filter(it => {
      let isAllNotMatched = true;
      for (const value of values) {
        if (self !== undefined && it[field] === self) {
          break;
        }
        if (it[field] === value) {
          isAllNotMatched = false;
          break;
        }
      }
      return isAllNotMatched;
    });
    return result;
  }
}
