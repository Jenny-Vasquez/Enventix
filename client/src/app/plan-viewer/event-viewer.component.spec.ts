import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventViewerComponent } from './plan-viewer.component';

describe('EventViewerComponent', () => {
  let component: EventViewerComponent;
  let fixture: ComponentFixture<EventViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
