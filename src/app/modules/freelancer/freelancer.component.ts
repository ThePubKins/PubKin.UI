import {  Component, OnInit } from '@angular/core';
import { FreeprofileComponent } from '../freeprofile/freeprofile.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JobpostService, UserauthenticateService } from '../../shared';

declare var bootstrap: any;
@Component({
  selector: 'app-freelancer',
  templateUrl: './freelancer.component.html',
  styleUrls: ['./freelancer.component.scss']
})
export class FreelancerComponent implements OnInit {
  filteredJobPosts: any[] = [];
  hide = false;
  searchTerm: string;
  currentUser: any;
  isFilterApplied: boolean = false;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  UserData : any;
  jobPosts : any;
  showMore : boolean = false;

  constructor(public dialog: MatDialog,
    public userservice : UserauthenticateService,
    public jobService : JobpostService,
    private router: Router) { 
    } 

    ShowMoreLess() { 
      this.showMore = !this.showMore ;
    }

    //Avatar for profile
    images=[  
      {img_url:'/assets/avd1.png'},
      {img_url:'/assets/avd2.png'},
      {img_url:'/assets/avd3.png'},
      {img_url:'/assets/avd4.png'},
      {img_url:'/assets/avd5.png'},
      {img_url:'/assets/avd6.png'},
      {img_url:'/assets/avd7.png'},
      {img_url:'/assets/avd8.png'}
    ]
  
    
    selectedImage: string | null = null;
    
    selectImage(image: any) {
      this.selectedImage = image.img_url;
    }
    
    selectedImage2: string | null = null;
    saveChanges(){
     this.selectedImage2 = this.selectedImage
  
    }


    //Search input functionality
  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
  }

  //Progress bar status Functionality
  // getProgressBarColor(): string {
  //   const progress = this.Freelancers[0].ProfilePercentage;

  //   if (progress < 35) {
  //     return '#666666'; 
  //   } else if (progress < 80) {
  //     return '#333333'; 
  //   } 
  //   else {
  //     return '#000000';
  //   }
  // }

  hidden() {
    this.hide = !this.hide
  }

  ngOnInit() {
   this.getUserData();
   this.getAllJobPosts();
   this.openDeliveryDialog();
    //Modal shows once
    const modalClosedTimestamp = sessionStorage.getItem('modalClosedTimestamp');  
    if (!modalClosedTimestamp || this.shouldShowModal(+modalClosedTimestamp)) {
      this.showModal();
    }
  }

  //close the modal and never again shows
    onClose() {
      sessionStorage.setItem('modalClosedTimestamp', Date.now().toString());
    }
    private showModal() {
      const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
      myModal.show();
    }
  
    private shouldShowModal(closedTimestamp: number): boolean {
      return Date.now() - closedTimestamp > 7200000;
    }


    //Get the current User details by MySql.
    getUserData() {
      const Email = this.userservice.getUserEmail() ?? sessionStorage.getItem('email');
      if (Email) {
        this.userservice.getUserData().subscribe({
          next: (data) => {
            this.UserData = data?.filter((UserData: any) => UserData.email === Email);
            console.log(this.UserData)
          },
          error: (err) => {
            console.error('Error fetching data:', err);
          }
        });
      } else {
      }
    }

  //SkillMatching
  onFilterButtonClick() {
    this.filterJobPosts();
    this.isFilterApplied = true;
  }

  onResetButtonClick() {
    this.filteredJobPosts = this.jobPosts;
    this.isFilterApplied = false;
  }

  //User filterJobs pending
  filterJobPosts() {
    if (this.UserData && this.jobPosts.length > 0) {
      const currentUserSkills = this.UserData.description.split(',').map((description: string) => description.trim().toLowerCase());
      this.filteredJobPosts = this.jobPosts.filter((jobPosts: { skillSet: string; }) => {
        const jobPostSkills = jobPosts.skillSet.split(',').map((skill: string) => skill.trim().toLowerCase());
        const similarityThreshold = 0.5;
        return this.calculateSimilarity(currentUserSkills, jobPostSkills) >= similarityThreshold;
      });
    } else {
      this.filteredJobPosts = this.jobPosts;
    }
  }

  //Get the all Job Posts
  getAllJobPosts() {
    this.jobService.getJobPost().subscribe((posts) => {
      this.jobPosts = posts;
    });
  }

  //Pagination for JobPosts
  get paginatedDataList(): { value: string; date: string }[] {
    const dataToPaginate = this.isFilterApplied ? this.filteredJobPosts : this.jobPosts;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return dataToPaginate.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  calculateSimilarity(arr1: string[], arr2: string[]): number {
    const commonSkills = arr1.filter(skill => arr2.includes(skill));
    const totalSkills = new Set([...arr1, ...arr2]);
    const similarityScore = commonSkills.length / totalSkills.size;
    return similarityScore;
  }

  logout(): void { }

  //Profile Completion Popup
  openDeliveryDialog() {
    this.dialog.open(FreeprofileComponent);
  }
  
  //Jobdetails Component details will be click the fn.
  showJobDetails(jobUniqueId: string): void {
    this.router.navigate(['/freelancers/job-details', jobUniqueId]);
  }

  hide23 = false;
   
  hide1() { 
  this.hide23 = !this.hide23;
  }
  

  //Posted Timeline
  getPostStatus(postDate:string) {  
    const today = new Date();
    const parts = postDate.split('-');
    const post = new Date(+parts[2], +parts[1] - 1, +parts[0]) ;
    const diffTime = today.getTime() - post.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) - 1);
    const diffMonths = (today.getFullYear() - post.getFullYear()) * 12 + (today.getMonth() - post.getMonth());
    const diffYears = today.getFullYear() - post.getFullYear();
    if (diffDays === 0) {
      return 'at Today';
    } else if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays <= 6) {
      return diffDays + ' days ago';
    } else if (diffDays <= 13) {
      return '1 week ago';
    } else if (diffDays <= 20) {
      return '2 weeks ago';
    } else if (diffDays <= 27) {
      return '3 weeks ago';
    } else if (diffMonths === 1) {
      return '1 month ago';
    } else if (diffMonths > 1 && diffMonths < 12) {
      return diffMonths + ' months ago';
    } else if (diffYears === 1) {
      return '1 year ago';
    } else {
      return diffYears + ' years ago';
    }
  }
  

} 

