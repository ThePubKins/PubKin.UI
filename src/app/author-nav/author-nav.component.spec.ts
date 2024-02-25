import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorNavComponent } from './author-nav.component';

describe('AuthorNavComponent', () => {
  let component: AuthorNavComponent;
  let fixture: ComponentFixture<AuthorNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorNavComponent]
    });
    fixture = TestBed.createComponent(AuthorNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
