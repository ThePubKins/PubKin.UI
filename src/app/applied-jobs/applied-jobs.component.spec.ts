import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedJobsComponent } from './applied-jobs.component';

describe('AppliedJobsComponent', () => {
  let component: AppliedJobsComponent;
  let fixture: ComponentFixture<AppliedJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppliedJobsComponent]
    });
    fixture = TestBed.createComponent(AppliedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
