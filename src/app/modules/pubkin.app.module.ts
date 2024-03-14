import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { HomeComponent } from './home';
import { SignupComponent } from './signup/signup.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { NgxSplideModule } from 'ngx-splide';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FreelancerComponent } from './freelancer/freelancer.component';
import { FreeprofileComponent } from './freeprofile/freeprofile.component';
import { ProfiledetailsComponent } from './profiledetails/profiledetails.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthprofileComponent } from './authprofile/authprofile.component';
import { ExampleComponent } from './example/example.component';
// import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { JobPostComponent } from './job-post/job-post.component';
import { CommentsComponent } from './comments/comments.component';
import { ProfilesettingComponent } from './profilesetting/profilesetting.component';
import { SetupProfileComponent } from './setup-profile/setup-profile.component';
import { ApplyNowComponent } from './apply-now/apply-now.component';
import { ViewFreelancersComponent } from './view-freelancers/view-freelancers.component';
import { AcceptRequestComponent } from './accept-request/accept-request.component';
import { MatIconModule } from '@angular/material/icon'
import { AppliedJobsComponent } from './applied-jobs/applied-jobs.component';
import { ProgressJobsComponent } from './progress-jobs/progress-jobs.component';
import {AuthorsCompletedJobsComponent } from './authors-completed-jobs/authors-completed-jobs.component'
import { CompletedComponent } from './completed/completed.component';
import { AvatarComponent } from './avatar/avatar.component';
import { FreelancernavComponent } from './freelancernav/freelancernav.component';
import { AuthorNavComponent } from './author-nav/author-nav.component';
import { OtpPopupComponent } from './signup/otp-popup/otp-popup.component';
import { AuthorsOngoingJobsComponent } from './authors-ongoing-jobs/authors-ongoing-jobs.component';
import { RoleComponent } from './role/role.component';
import { OngoingJobsComponent } from './ongoing-jobs/ongoing-jobs.component';
import { FootertagComponent } from './footertag/footertag.component';
import { PaymentComponent } from './payment/payment.component';
import { GooglesigninComponent } from './signup/googlesignin/googlesignin.component';
import { GoogleloginComponent } from './signup/googlelogin/googlelogin.component';
import {  JobsearchPipe } from '../shared';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
    SocialLoginModule,
    SocialAuthServiceConfig,
    GoogleLoginProvider,
  } from "@abacritt/angularx-social-login";
@NgModule({
    declarations: [
        SignupComponent,
        HomeComponent,
        FreelancerComponent,
        FreeprofileComponent,
        PaymentComponent,
        AuthorsCompletedJobsComponent,
        CommentsComponent,
        ProfiledetailsComponent,
        JobDetailsComponent,
        AuthorsComponent,
        AuthprofileComponent,
        ExampleComponent,
        JobPostComponent,
        ProfilesettingComponent,
        SetupProfileComponent,
        ApplyNowComponent,
        ViewFreelancersComponent,
        AcceptRequestComponent,
        AppliedJobsComponent,
        ProgressJobsComponent,
        CompletedComponent,
        AvatarComponent,
        FreelancernavComponent,
        AuthorNavComponent,
        OtpPopupComponent,
        AuthorsOngoingJobsComponent,
        RoleComponent,
        OngoingJobsComponent,
        FootertagComponent,GooglesigninComponent,GoogleloginComponent
    ],
    providers: [DatePipe,
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
              autoLogin: false,
              providers: [
                {
                  id: GoogleLoginProvider.PROVIDER_ID,
                  provider: new GoogleLoginProvider('202921354570-cgrtnggio9l9amugpir95rb33uf8dehm.apps.googleusercontent.com', {
                    scopes: 'openid profile email',
                  }),
                },
              ],
              onError: (err) => {
                console.error(err);
              },
            } as SocialAuthServiceConfig,
        },
        ],
    imports: [
        CommonModule, 
        RouterLink, 
        RouterLinkActive, 
        RouterOutlet,
        JobsearchPipe,
        SocialLoginModule,
        ReactiveFormsModule,
        NgxSplideModule,
        MatRadioModule,
        MatDialogModule,
        FormsModule,
        MatCheckboxModule,
        MatCardModule,
        MatCardModule,
        MatIconModule,
        SocialLoginModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
    ],
})
export class PubKinAppModule { }