import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopScheduleComponent } from './workshop-schedule.component';

describe('WorkshopScheduleComponent', () => {
  let component: WorkshopScheduleComponent;
  let fixture: ComponentFixture<WorkshopScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
