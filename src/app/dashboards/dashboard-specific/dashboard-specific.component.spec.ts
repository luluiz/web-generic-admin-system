import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSpecificComponent } from './dashboard-specific.component';

describe('DashboardSpecificComponent', () => {
  let component: DashboardSpecificComponent;
  let fixture: ComponentFixture<DashboardSpecificComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSpecificComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
