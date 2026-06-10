import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-welcome-screen',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './welcome-screen.component.html',
    styles: [`
        @keyframes welcomeLogoIn {
        from { opacity: 0; transform: translateY(-20px) scale(0.95); }
        to   { opacity: 1; transform: translateY(0)     scale(1); }
        }
        @keyframes welcomeTextIn {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressBar {
        from { width: 0%; }
        to   { width: 100%; }
        }
    `]
})
export class WelcomeScreenComponent implements OnInit {
    @Input() nombreUsuario = '';
    @Output() listo = new EventEmitter<void>();

    ngOnInit() {
        setTimeout(() => this.listo.emit(), 2800);
    }
}