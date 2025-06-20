import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-download-pod',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './download-pod.component.html',
  styleUrls: ['./download-pod.component.scss']
})
export class DownloadPodComponent implements OnInit {
  podSearchForm: FormGroup;
  fullPodData: any[] = []; // Holds all fetched data
  paginatedPodData: any[] = []; // Holds data for the current page

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10; // 10 data visible per page
  totalPages: number = 0;

  custCodes: string[] = ['ALL', 'CUST001', 'CUST002', 'CUST003'];

  constructor(private fb: FormBuilder) {
    this.podSearchForm = this.fb.group({
      panNumber: ['AAACD7999Q', Validators.required],
      custCode: ['ALL', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const today = new Date();
    const defaultDate = this.formatDate(today); // Format current date as YYYY-MM-DD
    this.podSearchForm.patchValue({
      fromDate: defaultDate,
      toDate: defaultDate
    });

    this.showPodImages(); // Load initial data on component init
  }

  // Helper to format date for input type="date"
  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  showPodImages(): void {
    if (this.podSearchForm.valid) {
      const formValues = this.podSearchForm.value;
      console.log('Fetching POD Images with:', formValues);

      // In a real application, you would make an API call here
      // and populate this.fullPodData with the fetched results.
      // For now, use the dummy data.

      // Dummy Data for demonstration (longer list for pagination)
      this.fullPodData = [
        { select: false, dwbNo: '757162695', bookingDt: '19-JUN-2025', custCode: '1025356', cnorName: 'DR REDDYS LABORATORI', fromCity: 'HYDERABAD', toCity: 'JAIPUR', cneeName: 'LAKESH SHARMA', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '119005634775', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'RAJPURA', toCity: 'PUNE', cneeName: 'DR REDDY LABORATORIE', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '117008871354', bookingDt: '19-JUN-2025', custCode: '1031511', cnorName: 'DR REDDYS LABORATORI', fromCity: 'HYDERABAD', toCity: 'CHENNAI', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '117008871376', bookingDt: '19-JUN-2025', custCode: '1031511', cnorName: 'DR REDDYS LABORATORI', fromCity: 'HYDERABAD', toCity: 'ERANAKULAM COURIER', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '116114423531', bookingDt: '19-JUN-2025', custCode: '1031511', cnorName: 'DR REDDYS LABORATORI', fromCity: 'BHIWANDI', toCity: 'NEW_DELHI', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '114012115446', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'NEW_DELHI', toCity: 'AHMEDABAD', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '463607432', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'NEW_DELHI', toCity: 'NAGPUR', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '463607443', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'NEW_DELHI', toCity: 'BHIWANDI', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '463607454', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'NEW_DELHI', toCity: 'RAJPUR', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '463607465', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'NEW_DELHI', toCity: 'CHENNAI', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '119005634635', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'RAJPURA', toCity: 'KOLKATA', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '119005634646', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'RAJPURA', toCity: 'HYDERABAD', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '119005634650', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'RAJPURA', toCity: 'BANGALORE', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '119005634661', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'RAJPURA', toCity: 'KOLKATA', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '119005634672', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'RAJPURA', toCity: 'PATNA', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '200000000001', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'MUMBAI', toCity: 'DELHI', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '200000000002', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'PUNE', toCity: 'CHANDIGARH', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '200000000003', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'CHENNAI', toCity: 'BANGALORE', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '200000000004', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'KOLKATA', toCity: 'HYDERABAD', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '200000000005', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'DELHI', toCity: 'MUMBAI', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '200000000006', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'AHMEDABAD', toCity: 'PUNE', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '200000000007', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'SURAT', toCity: 'CHENNAI', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '200000000008', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'JAIPUR', toCity: 'KOLKATA', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '200000000009', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'LUCKNOW', toCity: 'DELHI', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
        { select: false, dwbNo: '200000000010', bookingDt: '19-JUN-2025', custCode: '1005625', cnorName: 'DR REDDYS LABORATORI', fromCity: 'KANPUR', toCity: 'MUMBAI', cneeName: 'DR REDDY LABORATORI', deliveryDt: null, podImage: 'Download' },
      ];

      this.currentPage = 1; // Reset to first page after new search
      this.calculatePagination();
    } else {
      alert('Please fill all required fields for POD search.');
      this.podSearchForm.markAllAsTouched();
    }
  }

  clearForm(): void {
    const today = new Date();
    const defaultDate = this.formatDate(today);
    this.podSearchForm.reset({
      panNumber: 'AAACD7999Q',
      custCode: 'ALL',
      fromDate: defaultDate,
      toDate: defaultDate
    });
    this.fullPodData = [];
    this.paginatedPodData = [];
    this.currentPage = 1;
    this.totalPages = 0;
    console.log('POD search form cleared.');
  }

  // Pagination Logic
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.fullPodData.length / this.itemsPerPage);
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPodData = this.fullPodData.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  get pageNumbers(): number[] {
    // Generate an array of page numbers to display in pagination controls
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  downloadPodImage(dwbNo: string): void {
    alert(`Downloading POD Image for DWB No: ${dwbNo}`);
    console.log(`Initiating download for POD image of DWB No: ${dwbNo}`);
    // Implement actual download logic here (e.g., API call to get image blob)
  }
}