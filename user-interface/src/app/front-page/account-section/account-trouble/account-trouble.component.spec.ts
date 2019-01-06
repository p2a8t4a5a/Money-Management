import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTroubleComponent } from './account-trouble.component';

describe('AccountTroubleComponent', () => {
  let component: AccountTroubleComponent;
  let fixture: ComponentFixture<AccountTroubleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTroubleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTroubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
