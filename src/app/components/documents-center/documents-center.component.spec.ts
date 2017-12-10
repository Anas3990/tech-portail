import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsCenterComponent } from './documents-center.component';

describe('DocumentsCenterComponent', () => {
  let component: DocumentsCenterComponent;
  let fixture: ComponentFixture<DocumentsCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
