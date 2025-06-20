import { Routes } from '@angular/router';
import { ConsignmentReportComponent } from './consignment-report/consignment-report.component';
import { BillingReportComponent } from './billing-report/billing-report.component';
import { TrackShipmentBranchComponent } from './track-shipment-branch/track-shipment-branch.component';
import { PickupRequestComponent } from './pickup-request/pickup-request.component';
import { MaincontentComponent } from './maincontent/maincontent.component';
import { HomeComponent } from './home/home.component';
import { DownloadPodComponent } from './download-pod/download-pod.component';

export const routes: Routes = [
    {
    path: '',
    component: MaincontentComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'Consignment-Report', component: ConsignmentReportComponent },
      { path: 'Billing-Report', component: BillingReportComponent },
      { path: 'Track-Shipment-branch', component: TrackShipmentBranchComponent },
      { path: 'Pickup-Request', component: PickupRequestComponent },
      { path: 'Download-POD', component: DownloadPodComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];
