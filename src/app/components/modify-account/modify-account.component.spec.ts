import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAccountComponent } from './modify-account.component';

describe('ModifyAccountComponent', () => {
  let component: ModifyAccountComponent;
  let fixture: ComponentFixture<ModifyAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
