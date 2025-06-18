import { Routes } from '@angular/router';
import { ConsignmentReportComponent } from './consignment-report/consignment-report.component';
import { BillingReportComponent } from './billing-report/billing-report.component';
import { TrackShipmentBranchComponent } from './track-shipment-branch/track-shipment-branch.component';
import { PickupRequestComponent } from './pickup-request/pickup-request.component';
import { DownloadPODComponent } from './download-pod/download-pod.component';

export const routes: Routes = [
  {
    path: 'Consignment-Report',
    component: ConsignmentReportComponent,
  },
  {
    path: 'Billing-Report',
    component: BillingReportComponent,
  },
  {
    path: 'Track-Shipment-branch',
    component: TrackShipmentBranchComponent,
  },
  {
    path: 'Pickup-Request',
    component: PickupRequestComponent,
  },
  {
    path: 'Download-POD',
    component: DownloadPODComponent,
  },
];
