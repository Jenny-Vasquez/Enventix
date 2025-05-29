import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDesignerComponent } from './event-designer.component';

describe('EventDesignerComponent', () => {
  let component: EventDesignerComponent;
  let fixture: ComponentFixture<EventDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDesignerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
