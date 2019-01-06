import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountConnectionComponent } from './account-connection.component';

describe('LoginComponent', () => {
  let component: AccountConnectionComponent;
  let fixture: ComponentFixture<AccountConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
