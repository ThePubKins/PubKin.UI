import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsOngoingJobsComponent } from './authors-ongoing-jobs.component';

describe('AuthorsOngoingJobsComponent', () => {
  let component: AuthorsOngoingJobsComponent;
  let fixture: ComponentFixture<AuthorsOngoingJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorsOngoingJobsComponent]
    });
    fixture = TestBed.createComponent(AuthorsOngoingJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
