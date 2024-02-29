import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupProfileComponent } from './setup-profile.component';

describe('SetupProfileComponent', () => {
  let component: SetupProfileComponent;
  let fixture: ComponentFixture<SetupProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetupProfileComponent]
    });
    fixture = TestBed.createComponent(SetupProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
