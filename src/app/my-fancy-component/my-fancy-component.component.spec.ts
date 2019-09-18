import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFancyComponentComponent } from './my-fancy-component.component';

describe('MyFancyComponentComponent', () => {
  let component: MyFancyComponentComponent;
  let fixture: ComponentFixture<MyFancyComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFancyComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFancyComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
