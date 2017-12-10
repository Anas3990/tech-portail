import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInfosComponent } from './event-infos.component';

describe('EventInfosComponent', () => {
  let component: EventInfosComponent;
  let fixture: ComponentFixture<EventInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
