import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInfosComponent } from './new-infos.component';

describe('NewInfosComponent', () => {
  let component: NewInfosComponent;
  let fixture: ComponentFixture<NewInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
