import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanListComponent } from './plan-list.component';

describe('EventListComponent', () => {
  let component: PlanListComponent;
  let fixture: ComponentFixture<PlanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
