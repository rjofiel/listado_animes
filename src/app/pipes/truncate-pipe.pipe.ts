import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncatePipe'
})
export class TruncatePipePipe implements PipeTransform {

  transform(value: string, limit = 140, completeWords=false, ellipsis = '...'): string {

    if(completeWords)
    {
      if(value.length < limit){
        return value;
      }
      limit = value.substr(0, limit).lastIndexOf(' ');
    }

    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }

}
