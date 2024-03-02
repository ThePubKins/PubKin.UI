import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { SignupComponent } from './modules/signup/signup.component';
import { FreelancerComponent } from './modules/freelancer/freelancer.component';
import { RoleComponent } from './modules/role/role.component';
import { ProfiledetailsComponent } from './modules/profiledetails/profiledetails.component';
import { ProfilesettingComponent } from './modules/profilesetting/profilesetting.component';
import { JobDetailsComponent } from './modules/job-details/job-details.component';
import { AuthorsComponent } from './modules/authors/authors.component';
import { AuthorsOngoingJobsComponent } from './modules/authors-ongoing-jobs/authors-ongoing-jobs.component';
import { JobPostComponent } from './modules/job-post/job-post.component';
import { ApplyNowComponent } from './modules/apply-now/apply-now.component';
import { ViewFreelancersComponent } from './modules/view-freelancers/view-freelancers.component';
import { AcceptRequestComponent } from './modules/accept-request/accept-request.component';
import { AppliedJobsComponent } from './modules/applied-jobs/applied-jobs.component';
import { OngoingJobsComponent } from './modules/ongoing-jobs/ongoing-jobs.component';
import { CommentsComponent } from './modules/comments/comments.component';
import { ProgressJobsComponent } from './modules/progress-jobs/progress-jobs.component';
import { FootertagComponent } from './modules/footertag/footertag.component';


export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'signup/:action', component: SignupComponent },
  { path: 'freelancers', component: FreelancerComponent },
  { path: 'role', component: RoleComponent },
  { path: 'profile/:contentName', component: ProfiledetailsComponent },
  { path: 'setting/:name', component: ProfilesettingComponent },
  { path: 'freelancers/job-details/:id', component: JobDetailsComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'authors/on-going-jobs', component: AuthorsOngoingJobsComponent },
  {path: "post-a-job",component:JobPostComponent},
  { path: 'freelancers/apply-now/:id', component: ApplyNowComponent },
  { path: "setting", component: ProfilesettingComponent },
  { path: 'authors/accept-a-request', component: ViewFreelancersComponent },
  { path: 'authors/accept-a-request/pick-now/:JobId', component: AcceptRequestComponent },
  { path: 'freelancers/applied-jobs', component: AppliedJobsComponent },
  { path: 'freelancers/completed', component: OngoingJobsComponent },
  { path: 'comments/:id', component: CommentsComponent },
  { path: 'freelancers/progress', component: ProgressJobsComponent },
  { path: 'WhatisPubKin?', component: FootertagComponent }
];

