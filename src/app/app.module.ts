import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms'; 
import  { ReactiveFormsModule } from '@angular/forms'
import { NgxSplideModule} from 'ngx-splide';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { FreelancerComponent } from './freelancer/freelancer.component';
import { FreeprofileComponent } from './freeprofile/freeprofile.component';
import { ProfiledetailsComponent } from './profiledetails/profiledetails.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthprofileComponent } from './authprofile/authprofile.component';
import { ExampleComponent } from './example/example.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
} from '@abacritt/angularx-social-login';
import { JobPostComponent } from './job-post/job-post.component';
import { CommentsComponent } from './comments/comments.component'; 
import { ProfilesettingComponent } from './profilesetting/profilesetting.component';
import { SetupProfileComponent } from './setup-profile/setup-profile.component';
import { ApplyNowComponent } from './apply-now/apply-now.component';
import { ViewFreelancersComponent } from './view-freelancers/view-freelancers.component';
import { AcceptRequestComponent } from './accept-request/accept-request.component';
import { AuthInterceptor } from './Service/interceptor';
import {MatIconModule} from '@angular/material/icon'
import { LinkifyPipe } from './pipes/linkfy.pipe';
import { TruncatePipe } from './pipes/linkfy.pipe';
import { JobsearchPipe } from './pipes/jobsearch.pipe';
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { ProgressJobsComponent } from './progress-jobs/progress-jobs.component';
import { CompletedComponent } from './completed/completed.component';
import { AvatarComponent } from './avatar/avatar.component';
import { FreelancernavComponent } from './freelancernav/freelancernav.component';
import { DatePipe } from '@angular/common';
import { AuthorNavComponent } from './author-nav/author-nav.component';
import { FileSizePipe } from './pipes/linkfy.pipe';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { OtpPopupComponent } from './signup/otp-popup/otp-popup.component';
import { AuthorsOngoingJobsComponent } from './authors-ongoing-jobs/authors-ongoing-jobs.component';
import { RoleComponent } from './role/role.component';
import { OngoingJobsComponent } from './ongoing-jobs/ongoing-jobs.component';
import { FootertagComponent } from './footertag/footertag.component';
const firebaseConfig = {
  // apiKey: "AIzaSyCnQbgNXDJT6sy1_f8gx3d74kM-3FY2uCw",
  // authDomain: "pubkin-6efd2.firebaseapp.com",
  // projectId: "pubkin-6efd2",
  // storageBucket: "pubkin-6efd2.appspot.com",
  // messagingSenderId: "1019249625237",
  // appId: "1:1019249625237:web:73473b4f492538851a739c"
  apiKey: "AIzaSyAdckeaaJ3jwqzIrpVmrm8Jw5-pGNKVlb0",
  authDomain: "pubkin20.firebaseapp.com",
  databaseURL: "https://pubkin20-default-rtdb.firebaseio.com",
  projectId: "pubkin20",
  storageBucket: "pubkin20.appspot.com",
  messagingSenderId: "1074836594378",
  appId: "1:1074836594378:web:d490abc4ff86b500689e33",
  measurementId: "G-3WR3CTR306"
};

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    HomeComponent,
    FreelancerComponent,
    FreeprofileComponent,
    CommentsComponent,
    ProfiledetailsComponent,
    JobDetailsComponent,
    AuthorsComponent,
    AuthprofileComponent,
    ExampleComponent,JobsearchPipe,
    JobPostComponent,
    ProfilesettingComponent,
    SetupProfileComponent,
    ApplyNowComponent,
    ViewFreelancersComponent,
    AcceptRequestComponent,FileSizePipe,
    LinkifyPipe,TruncatePipe, AppliedJobsComponent, ProgressJobsComponent, CompletedComponent, AvatarComponent, FreelancernavComponent, AuthorNavComponent, OtpPopupComponent, AuthorsOngoingJobsComponent, RoleComponent, OngoingJobsComponent, FootertagComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    SocialLoginModule,
    ReactiveFormsModule,
    NgxSplideModule,
    HttpClientModule,
    MatRadioModule,
    MatDialogModule,
    FormsModule,
    MatCheckboxModule,
    MatCardModule,MatCardModule,MatIconModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
  ],
  providers: [
    DatePipe,
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
