import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MaincontentComponent } from "../maincontent/maincontent.component";
interface DashboardCard {
  title: string;
  value: number;
}

interface RecentShipment {
  dwb: string;
  status: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgChartsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

dashboardCards: DashboardCard[] = [];
recentShipments: RecentShipment[] = [];
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Sales A',
        backgroundColor: 'rgba(224, 15, 162, 0.3)',
        borderColor: 'rgb(224, 15, 162)',
        pointBackgroundColor: 'rgb(23, 101, 226)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(8, 94, 233, 0.8)',
        fill: 'origin',
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Sales B',
        backgroundColor: 'rgba(97, 233, 18, 0.3)',
        borderColor: 'rgb(97, 233, 18)',
        pointBackgroundColor: 'rgb(9, 81, 236)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(12, 82, 233, 0.8)',
        fill: 'origin',
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        data: [18, 40, 30, 49, 70, 35, 60],
        label: 'Sales C',
        backgroundColor: 'rgba(54, 162, 235, 0.3)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(255, 159, 64)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 159, 64, 0.8)',
        fill: 'origin',
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.3,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  public lineChartType: 'line' = 'line';
  public isBrowser: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
  this.isBrowser = isPlatformBrowser(this.platformId);

  this.dashboardCards = [
    { title: "Today's Shipment", value: 1238 },
    { title: "Yesterday's Shipment", value: 1228 },
    { title: "Pending POD's", value: 112 },
    { title: "Pickup Request", value: 89 }
  ];

  this.recentShipments = [
    { dwb: 'DWB-01234', status: 'Delivered to Chennai', icon: 'bi bi-check-square-fill', color: 'text-success' },
    { dwb: 'DWB-04567', status: 'In transit to Mumbai', icon: 'bi bi-truck', color: 'text-info' },
    { dwb: 'DWB-09887', status: 'Failed delivery', icon: 'bi bi-x-square-fill', color: 'text-danger' },
    { dwb: 'DWB-06543', status: 'Delivered to Delhi', icon: 'bi bi-check-square-fill', color: 'text-success' }
  ];
}

}
