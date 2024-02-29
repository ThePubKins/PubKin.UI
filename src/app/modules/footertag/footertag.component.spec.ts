import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootertagComponent } from './footertag.component';

describe('FootertagComponent', () => {
  let component: FootertagComponent;
  let fixture: ComponentFixture<FootertagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FootertagComponent]
    });
    fixture = TestBed.createComponent(FootertagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
