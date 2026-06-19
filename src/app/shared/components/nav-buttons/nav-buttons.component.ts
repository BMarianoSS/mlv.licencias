import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-nav-buttons',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <div class="bg-gray-50 border-t border-gray-200 px-5 py-4 flex justify-between gap-3">
            <button 
                *ngIf="backRoute; else backBtn"
                [routerLink]="[backRoute]"
                (click)="back.emit()"
                class="cursor-pointer inline-flex items-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg transition">
                <span class="material-icons text-[15px]">arrow_back</span>
                {{ backLabel }}
            </button>
            <ng-template #backBtn>
                <button (click)="back.emit()"
                    class="cursor-pointer inline-flex items-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg transition">
                    <span class="material-icons text-[15px]">arrow_back</span>
                    {{ backLabel }}
                </button>
            </ng-template>

            <button
                *ngIf="nextRoute; else nextBtn"
                [routerLink]="[nextRoute]"
                [disabled]="nextDisabled"
                (click)="next.emit()"
                class="cursor-pointer inline-flex items-center gap-1.5 bg-[#1A6DB5] hover:bg-[#0F2D5C] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed">
                {{ nextLabel }}
                <span class="material-icons text-[15px]">arrow_forward</span>
            </button>
            <ng-template #nextBtn>
                <button
                    [disabled]="nextDisabled"
                    (click)="next.emit()"
                    class="cursor-pointer inline-flex items-center gap-1.5 bg-[#1A6DB5] hover:bg-[#0F2D5C] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed">
                    {{ nextLabel }}
                    <span class="material-icons text-[15px]">arrow_forward</span>
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