import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingJobsComponent } from './ongoing-jobs.component';

describe('OngoingJobsComponent', () => {
  let component: OngoingJobsComponent;
  let fixture: ComponentFixture<OngoingJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OngoingJobsComponent]
    });
    fixture = TestBed.createComponent(OngoingJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
