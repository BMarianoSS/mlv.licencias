import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pantalla6-2.component.html',
  styleUrl: './pantalla6-2.component.css'
})
export class pantalla62Component implements AfterViewInit{
  sidebarOpen = false;

 ngAfterViewInit(): void {
  }

  constructor(private router: Router) {}
}
