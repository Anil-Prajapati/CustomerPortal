import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackShipmentBranchComponent } from './track-shipment-branch.component';

describe('TrackShipmentBranchComponent', () => {
  let component: TrackShipmentBranchComponent;
  let fixture: ComponentFixture<TrackShipmentBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackShipmentBranchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrackShipmentBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
