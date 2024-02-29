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
    return JobPost.JobTitle.toLowerCase().includes(searchTerm) ||
      JobPost.SkillSet.toLowerCase().includes(searchTerm) || 
      JobPost.JobUniqueId.toLowerCase().includes(searchTerm);
    });
  }

}  
  