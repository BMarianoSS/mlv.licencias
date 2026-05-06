import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class principalComponent{
  constructor(private router: Router) {}

  sidebarOpen = false;
  datos: any;

  @ViewChild('barCanvas') barCanvas!: ElementRef;
  @ViewChild('pieCanvas') pieCanvas!: ElementRef;
  
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
