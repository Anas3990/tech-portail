import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsCenterComponent } from './events-center.component';

describe('EventsCenterComponent', () => {
  let component: EventsCenterComponent;
  let fixture: ComponentFixture<EventsCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
