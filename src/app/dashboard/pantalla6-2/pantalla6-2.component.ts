import { Component } from '@angular/core';
import { SectionHeaderComponent } from '../../shared';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, SectionHeaderComponent],
  templateUrl: './pantalla6-2.component.html',
  styleUrl: './pantalla6-2.component.css'
})
export class pantalla62Component{
  sidebarOpen = false;

  constructor(private router: Router) {}
}
