import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFreelancersComponent } from './view-freelancers.component';

describe('ViewFreelancersComponent', () => {
  let component: ViewFreelancersComponent;
  let fixture: ComponentFixture<ViewFreelancersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFreelancersComponent]
    });
    fixture = TestBed.createComponent(ViewFreelancersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
