import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressJobsComponent } from './progress-jobs.component';

describe('ProgressJobsComponent', () => {
  let component: ProgressJobsComponent;
  let fixture: ComponentFixture<ProgressJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressJobsComponent]
    });
    fixture = TestBed.createComponent(ProgressJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
