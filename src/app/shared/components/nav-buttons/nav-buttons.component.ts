import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-nav-buttons',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <div class="bg-gray-50 px-5 py-4 flex justify-between gap-3">
        <button 
            *ngIf="backRoute; else backBtn"
            [routerLink]="[backRoute]"
            (click)="back.emit()"
            class="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg transition">
            ← {{ backLabel }}
        </button>
        <ng-template #backBtn>
            <button (click)="back.emit()"
            class="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg transition">
            ← {{ backLabel }}
            </button>
        </ng-template>

        <button
            *ngIf="nextRoute; else nextBtn"
            [routerLink]="[nextRoute]"
            [disabled]="nextDisabled"
            (click)="next.emit()"
            class="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-blue-50 text-sm font-medium px-6 py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
            {{ nextLabel }} <span class="text-base leading-none">→</span>
        </button>
        <ng-template #nextBtn>
            <button
            [disabled]="nextDisabled"
            (click)="next.emit()"
            class="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-blue-50 text-sm font-medium px-6 py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
            {{ nextLabel }} <span class="text-base leading-none">→</span>
            </button>
        </ng-template>
        </div>
    `
})
export class NavButtonsComponent {
    @Input() backLabel = 'Regresar';
    @Input() nextLabel = 'Continuar';
    @Input() backRoute = '';
    @Input() nextRoute = '';
    @Input() nextDisabled = false;
    @Output() back = new EventEmitter<void>();
    @Output() next = new EventEmitter<void>();
}