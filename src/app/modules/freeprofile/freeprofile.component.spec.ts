import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeprofileComponent } from './freeprofile.component';

describe('FreeprofileComponent', () => {
  let component: FreeprofileComponent;
  let fixture: ComponentFixture<FreeprofileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreeprofileComponent]
    });
    fixture = TestBed.createComponent(FreeprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
