import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDesignerComponent } from './plan-designer.component';

describe('EventDesignerComponent', () => {
  let component: PlanDesignerComponent;
  let fixture: ComponentFixture<PlanDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanDesignerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});