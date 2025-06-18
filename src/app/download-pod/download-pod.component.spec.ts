import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadPODComponent } from './download-pod.component';

describe('DownloadPODComponent', () => {
  let component: DownloadPODComponent;
  let fixture: ComponentFixture<DownloadPODComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadPODComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DownloadPODComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
