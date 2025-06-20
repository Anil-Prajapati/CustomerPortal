import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consignment-report', // Renamed selector
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './consignment-report.component.html', // Renamed template URL
  styleUrls: ['./consignment-report.component.scss'] // Renamed style URL
})
export class ConsignmentReportComponent implements OnInit { // Renamed component class
  consignmentReportForm: FormGroup; // Renamed form group property
  fullReportData: any[] = []; // Holds all fetched data
  paginatedReportData: any[] = []; // Holds data for the current page

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(private fb: FormBuilder) {
    this.consignmentReportForm = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reportType: ['Booking', Validators.required] // Default to 'Booking'
    });
  }

  ngOnInit(): void {
    const today = new Date();
    // Set default dates based on image: 20-May-2025 and 20-Jun-2025
    const defaultToDate = this.formatDate(today);
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    const defaultFromDate = this.formatDate(oneMonthAgo);

    this.consignmentReportForm.patchValue({
      fromDate: defaultFromDate,
      toDate: defaultToDate
    });

    this.fetchConsignmentReport(); // Load initial data on component init
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

  fetchConsignmentReport(): void {
    if (this.consignmentReportForm.valid) {
      const formValues = this.consignmentReportForm.value;
      console.log('Fetching Consignment Report with:', formValues);

      // Dummy Data for demonstration (longer list for pagination)
      // This data mimics the structure seen in image_03da67.png
      this.fullReportData = [
        { branch: 'DR REDDY LAB LTD', paidNo: 0, paidAmt: 0, tbbNo: 149, tbbAmt: 1526195.54, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 24279, totNo: 149, totAmt: 1526196 },
        { branch: 'INDORE', paidNo: 0, paidAmt: 0, tbbNo: 3, tbbAmt: 13216, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 160, totNo: 3, totAmt: 13216 },
        { branch: 'LAJPAT NAGAR DELHI', paidNo: 0, paidAmt: 0, tbbNo: 96, tbbAmt: 106169.04, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 5356, totNo: 96, totAmt: 106169 },
        { branch: 'BADDI', paidNo: 0, paidAmt: 0, tbbNo: 0, tbbAmt: 0, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 17695, totNo: 11, totAmt: 191107 },
        { branch: 'KALYAN BYPASS', paidNo: 0, paidAmt: 0, tbbNo: 2, tbbAmt: 19234, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 230, totNo: 2, totAmt: 19234 },
        { branch: 'KRISHANPURA', paidNo: 0, paidAmt: 0, tbbNo: 19, tbbAmt: 2360, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 5460, totNo: 2, totAmt: 57985 },
        { branch: 'PATNA', paidNo: 0, paidAmt: 0, tbbNo: 2, tbbAmt: 2596, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 25, totNo: 2, totAmt: 2596 },
        { branch: 'JHARMAJRI DELHI', paidNo: 0, paidAmt: 0, tbbNo: 0, tbbAmt: 0, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 745, totNo: 1, totAmt: 7912 },
        { branch: 'KOLKATA', paidNo: 0, paidAmt: 0, tbbNo: 3, tbbAmt: 14000.7, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 125, totNo: 3, totAmt: 14001 },
        { branch: 'TARNAKA', paidNo: 0, paidAmt: 0, tbbNo: 9, tbbAmt: 256485.98, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 4257, totNo: 9, totAmt: 256486 },
        { branch: 'BHIWANDI BOOKING', paidNo: 0, paidAmt: 0, tbbNo: 34, tbbAmt: 391028.4, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 4734, totNo: 34, totAmt: 391028 },
        { branch: 'TEPLA', paidNo: 0, paidAmt: 0, tbbNo: 162, tbbAmt: 542782.3, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 7641, totNo: 162, totAmt: 542782 },
        { branch: 'KOMPALLY', paidNo: 0, paidAmt: 0, tbbNo: 0, tbbAmt: 0, fodNo: 0, fodAmt: 0, bodNo: 39, bodAmt: 588181.91, codNo: 0, codAmt: 0, totWt: 0, totNo: 0, totAmt: 0 },
        { branch: 'VIJAYANAGARAM', paidNo: 0, paidAmt: 0, tbbNo: 0, tbbAmt: 0, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 0, totNo: 0, totAmt: 0 },
        { branch: 'DHARAMPUR', paidNo: 0, paidAmt: 0, tbbNo: 0, tbbAmt: 0, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 0, totNo: 0, totAmt: 0 },
        { branch: 'GUWAHATI', paidNo: 0, paidAmt: 0, tbbNo: 0, tbbAmt: 0, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 0, totNo: 0, totAmt: 0 },
        { branch: 'SAMPLE BRANCH 1', paidNo: 1, paidAmt: 100, tbbNo: 5, tbbAmt: 5000, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 100, totNo: 5, totAmt: 5100 },
        { branch: 'SAMPLE BRANCH 2', paidNo: 2, paidAmt: 200, tbbNo: 8, tbbAmt: 8000, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 200, totNo: 8, totAmt: 8200 },
        { branch: 'SAMPLE BRANCH 3', paidNo: 0, paidAmt: 0, tbbNo: 12, tbbAmt: 12000, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 300, totNo: 12, totAmt: 12000 },
        { branch: 'SAMPLE BRANCH 4', paidNo: 3, paidAmt: 300, tbbNo: 7, tbbAmt: 7000, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 150, totNo: 7, totAmt: 7300 },
        { branch: 'SAMPLE BRANCH 5', paidNo: 0, paidAmt: 0, tbbNo: 10, tbbAmt: 10000, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 250, totNo: 10, totAmt: 10000 },
        { branch: 'SAMPLE BRANCH 6', paidNo: 1, paidAmt: 50, tbbNo: 4, tbbAmt: 4000, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 80, totNo: 4, totAmt: 4050 },
        { branch: 'SAMPLE BRANCH 7', paidNo: 0, paidAmt: 0, tbbNo: 6, tbbAmt: 6000, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 120, totNo: 6, totAmt: 6000 },
        { branch: 'SAMPLE BRANCH 8', paidNo: 2, paidAmt: 150, tbbNo: 9, tbbAmt: 9000, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 180, totNo: 9, totAmt: 9150 },
        { branch: 'SAMPLE BRANCH 9', paidNo: 0, paidAmt: 0, tbbNo: 11, tbbAmt: 11000, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 220, totNo: 11, totAmt: 11000 },
        { branch: 'SAMPLE BRANCH 10', paidNo: 1, paidAmt: 75, tbbNo: 3, tbbAmt: 3000, fodNo: 0, fodAmt: 0, bodNo: 0, bodAmt: 0, codNo: 0, codAmt: 0, totWt: 60, totNo: 3, totAmt: 3075 },
      ];


      this.currentPage = 1; // Reset to first page after new search
      this.calculatePagination();
    } else {
      alert('Please fill all required fields for Consignment Report search.');
      this.consignmentReportForm.markAllAsTouched();
    }
  }

  clearForm(): void {
    const today = new Date();
    const defaultToDate = this.formatDate(today);
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    const defaultFromDate = this.formatDate(oneMonthAgo);

    this.consignmentReportForm.reset({
      fromDate: defaultFromDate,
      toDate: defaultToDate,
      reportType: 'Booking'
    });
    this.fullReportData = [];
    this.paginatedReportData = [];
    this.currentPage = 1;
    this.totalPages = 0;
    console.log('Consignment report form cleared.');
  }

  // Pagination Logic
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.fullReportData.length / this.itemsPerPage);
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedReportData = this.fullReportData.slice(startIndex, endIndex);
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
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  exportToExcel(): void {
    alert('Exporting data to Excel (functionality to be implemented)');
    console.log('Exporting all Consignment Report data to Excel:', this.fullReportData);
  }
}