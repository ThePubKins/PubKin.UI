import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobsearch',
  standalone: true
})
export class JobsearchPipe implements PipeTransform {

  transform(JobPost: any[], searchTerm: string): any[] {
    if (!JobPost || !searchTerm) {
      return JobPost;
    }

    searchTerm = searchTerm.toLowerCase();

    return JobPost.filter(JobPost => {
    return JobPost.jobTitle.toLowerCase().includes(searchTerm) ||
      JobPost.skillSet.toLowerCase().includes(searchTerm) || 
      JobPost.jobUniqueId.toLowerCase().includes(searchTerm);
    });
  }

}  
  