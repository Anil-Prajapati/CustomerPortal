import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-maincontent',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './maincontent.component.html',
  styleUrl: './maincontent.component.css'
})
export class MaincontentComponent {

}
