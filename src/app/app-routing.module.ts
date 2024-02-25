import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { FreelancerComponent } from './freelancer/freelancer.component';
import { ProfiledetailsComponent } from './profiledetails/profiledetails.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AuthorsComponent } from './authors/authors.component';
import { JobPostComponent } from './job-post/job-post.component';
import { ProfilesettingComponent } from './profilesetting/profilesetting.component';
import { ApplyNowComponent } from './apply-now/apply-now.component';
import { ViewFreelancersComponent } from './view-freelancers/view-freelancers.component';
import { AcceptRequestComponent } from './accept-request/accept-request.component';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { CompletedComponent } from './completed/completed.component';
import { ProgressJobsComponent } from './progress-jobs/progress-jobs.component';
import { AuthorsOngoingJobsComponent } from './authors-ongoing-jobs/authors-ongoing-jobs.component';
import { RoleComponent } from './role/role.component';
import { CommentsComponent } from './comments/comments.component';
import { OngoingJobsComponent } from './ongoing-jobs/ongoing-jobs.component';
import { FootertagComponent } from './footertag/footertag.component';


const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"signup/:action", component:SignupComponent},
  {path:"freelancers", component:FreelancerComponent},
  {path:"role", component:RoleComponent},
  {path:"profile/:contentName", component:ProfiledetailsComponent},
  {path:"setting/:name", component:ProfilesettingComponent},  
  {path:"freelancers/job-details/:id", component:JobDetailsComponent },
  {path:"authors", component:AuthorsComponent},
  {path:"authors/on-going-jobs", component:AuthorsOngoingJobsComponent},
  {path:"post-a-job", component:JobPostComponent},
  {path:"freelancers/apply-now/:id", component:ApplyNowComponent},
  {path:"setting", component:ProfilesettingComponent},
  {path:"authors/accept-a-request", component:ViewFreelancersComponent},
  {path:"authors/accept-a-request/pick-now/:JobId", component:AcceptRequestComponent},
  {path:"freelancers/applied-jobs", component:AppliedJobsComponent},
  {path:"freelancers/completed", component:OngoingJobsComponent},
  {path:"comments/:id", component:CommentsComponent},
  {path:"freelancers/progress", component:ProgressJobsComponent},
  {path:"WhatisPubKin?",component:FootertagComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
