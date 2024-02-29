
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkify',
  standalone: true
})
export class LinkifyPipe implements PipeTransform {
  transform(value: string): string {
    // Regular expression to identify URLs in the text
    const urlRegex = /(\bhttps?:\/\/\S+\b)/gi;
    
    return value.replace(urlRegex, (url: string) => `<a class="custom-link" href="${url}" target="_blank">${url}</a>`);
  }
}
@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number): string {
    if (value.length > limit) {
      return value.slice(0, limit) + '...';
    }
    return value;
  }
}
@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
  transform(size: number): string {
    if (size === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));

    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}