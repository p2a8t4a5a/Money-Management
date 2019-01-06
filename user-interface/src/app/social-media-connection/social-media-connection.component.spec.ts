import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMediaConnectionComponent } from './social-media-connection.component';

describe('SocialMediaConnectionComponent', () => {
  let component: SocialMediaConnectionComponent;
  let fixture: ComponentFixture<SocialMediaConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMediaConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
