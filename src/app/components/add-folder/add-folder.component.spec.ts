import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFolderComponent } from './add-folder.component';

describe('AddFolderComponent', () => {
  let component: AddFolderComponent;
  let fixture: ComponentFixture<AddFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});