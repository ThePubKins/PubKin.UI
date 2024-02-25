import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesettingComponent } from './profilesetting.component';

describe('ProfilesettingComponent', () => {
  let component: ProfilesettingComponent;
  let fixture: ComponentFixture<ProfilesettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilesettingComponent]
    });
    fixture = TestBed.createComponent(ProfilesettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
