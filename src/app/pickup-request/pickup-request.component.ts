import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms'; // Import AbstractControl

@Component({
  selector: 'app-pickup-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pickup-request.component.html',
  styleUrls: ['./pickup-request.component.scss']
})
export class PickupRequestComponent implements OnInit {
  selectedReportType: string = 'pickupRequest'; // Default selected radio button

  pickupRequestForm: FormGroup;
  pickupBulkUploadForm: FormGroup; // Keep this as is
  pickupStatusReportForm: FormGroup; // Keep this as is

  constructor(private fb: FormBuilder) {
    // Initialize Pickup Request Form with all new fields
    this.pickupRequestForm = this.fb.group({
      destinationPincode: ['', Validators.required],
      // Delivery Address
      deliveryName: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      deliveryPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      deliveryEmail: ['', [Validators.required, Validators.email]],
      toPin: ['', Validators.required],
      freightPaidAt: ['Booking Point', Validators.required], // Set a default and make required
      goodType: ['', Validators.required], // Required dropdown

      // Booking Address
      bookingName: ['', Validators.required],
      bookingAddress: ['', Validators.required],
      bookingPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      bookingEmail: ['', [Validators.required, Validators.email]],
      fromPin: ['', Validators.required],
      serviceType: ['', Validators.required], // Required dropdown

      // Other Details
      weight: ['', [Validators.required, Validators.min(0.01)]], // Weight should be positive
      remark: [''],
      requestedBy: ['Booking Address', Validators.required], // Set a default and make required

      // Conditional fields for "Requested By: OTHER"
      otherName: [''],
      otherPhone: [''],
      otherEmail: [''],
      otherAddress: [''],

      packetImage1: [null], // For file upload
      preferredPickupDate: ['', Validators.required],
      timeSlot: ['', Validators.required], // Required dropdown
    });

    // Initialize Pickup Request Bulk Upload Form (as is)
    this.pickupBulkUploadForm = this.fb.group({
      goodType: [''],
      timeSlot: ['2-4 PM'],
      serviceTypeSurface: [false],
      serviceTypeAir: [false],
      serviceTypeAirInter: [false],
      selectFile: [null, Validators.required],
    });

    // Initialize Pickup Status Report Form (as is)
    this.pickupStatusReportForm = this.fb.group({
      requestFromDate: ['', Validators.required],
      requestToDate: ['', Validators.required],
      selectType: ['All'],
    });
  }

  ngOnInit(): void {
    const today = new Date();
    const todayFormatted = today.toISOString().slice(0, 10);

    this.pickupStatusReportForm.patchValue({
      requestFromDate: todayFormatted,
      requestToDate: todayFormatted
    });

    // Set default preferred pickup date for the pickup request form
    this.pickupRequestForm.patchValue({
      preferredPickupDate: todayFormatted
    });

    // Subscribe to changes in 'requestedBy' to conditionally apply validators
    this.pickupRequestForm.get('requestedBy')?.valueChanges.subscribe(value => {
      this.setOtherContactValidators(value);
    });

    // Initialize validators based on initial 'requestedBy' value
    this.setOtherContactValidators(this.pickupRequestForm.get('requestedBy')?.value);
  }

  // Method to conditionally apply/clear validators for 'OTHER' contact fields
  private setOtherContactValidators(requestedByValue: string): void {
    const otherNameControl = this.pickupRequestForm.get('otherName');
    const otherPhoneControl = this.pickupRequestForm.get('otherPhone');
    const otherEmailControl = this.pickupRequestForm.get('otherEmail');
    const otherAddressControl = this.pickupRequestForm.get('otherAddress');

    if (requestedByValue === 'OTHER') {
      otherNameControl?.setValidators(Validators.required);
      otherPhoneControl?.setValidators([Validators.required, Validators.pattern('^[0-9]{10}$')]);
      otherEmailControl?.setValidators([Validators.required, Validators.email]);
      otherAddressControl?.setValidators(Validators.required);
    } else {
      otherNameControl?.clearValidators();
      otherPhoneControl?.clearValidators();
      otherEmailControl?.clearValidators();
      otherAddressControl?.clearValidators();
    }
    otherNameControl?.updateValueAndValidity();
    otherPhoneControl?.updateValueAndValidity();
    otherEmailControl?.updateValueAndValidity();
    otherAddressControl?.updateValueAndValidity();
  }

  onRadioChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedReportType = target.value;
  }

  // This method remains for the Bulk Upload form
  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    let file: File | null = null;
    if (element.files && element.files.length > 0) {
      file = element.files[0];
    }
    this.pickupBulkUploadForm.patchValue({
      selectFile: file
    });
    this.pickupBulkUploadForm.get('selectFile')?.markAsTouched();
  }

  // New method for file selection in Pickup Request form (Packet Image)
  onPacketImageSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    let file: File | null = null;
    if (element.files && element.files.length > 0) {
      file = element.files[0];
    }
    this.pickupRequestForm.patchValue({
      packetImage1: file
    });
    this.pickupRequestForm.get('packetImage1')?.markAsTouched();
  }


  // Submit methods for each form
  submitPickupRequest(): void {
    if (this.pickupRequestForm.valid) {
      console.log('Pickup Request Submitted:', this.pickupRequestForm.value);
      alert('Pickup Request Submitted Successfully!');
    } else {
      alert('Please fill all required fields for Pickup Request correctly.');
      this.pickupRequestForm.markAllAsTouched();
      // Optional: scroll to first invalid field or highlight them
    }
  }

  submitBulkUpload(): void {
    if (this.pickupBulkUploadForm.valid) {
      console.log('Bulk Upload Submitted:', this.pickupBulkUploadForm.value);
      alert('Bulk Upload Submitted Successfully!');
    } else {
      alert('Please select a file for Bulk Upload and fill other required fields.');
      this.pickupBulkUploadForm.markAllAsTouched();
    }
  }

  submitPickupStatusReport(): void {
    if (this.pickupStatusReportForm.valid) {
      console.log('Pickup Status Report Submitted:', this.pickupStatusReportForm.value);
      alert('Pickup Status Report options submitted!');
    } else {
      alert('Please fill all required fields for Pickup Status Report correctly.');
      this.pickupStatusReportForm.markAllAsTouched();
    }
  }

  showPickupStatus(): void {
    this.submitPickupStatusReport();
  }

  exportExcel(): void {
    console.log('Exporting Pickup Status Report to Excel...');
    alert('Exporting to Excel (functionality to be implemented)');
  }

  clearPickupStatus(): void {
    const today = new Date();
    const todayFormatted = today.toISOString().slice(0, 10);

    this.pickupStatusReportForm.reset({
      selectType: 'All',
      requestFromDate: todayFormatted,
      requestToDate: todayFormatted
    });
    console.log('Pickup Status Report form cleared.');
  }

  // Method to clear the Pickup Request form
  clearPickupRequestForm(): void {
    const today = new Date();
    const todayFormatted = today.toISOString().slice(0, 10);

    this.pickupRequestForm.reset({
      freightPaidAt: 'Booking Point',
      requestedBy: 'Booking Address',
      preferredPickupDate: todayFormatted,
      timeSlot: '' // Reset dropdown to default empty or 'Select'
    });
    // This will re-trigger valueChanges and clear conditional validators
    this.pickupRequestForm.get('requestedBy')?.updateValueAndValidity();
  }
}