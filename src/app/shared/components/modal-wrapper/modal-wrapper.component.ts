import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modal-wrapper',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div 
            [class]="leaving ? 'modal-leave' : 'modal-enter'"
            [ngStyle]="{ width: width, maxHeight: maxHeight }"
            class="bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">

            <!-- Header -->
            <div class="bg-blue-700 px-5 py-3 flex justify-between items-center flex-shrink-0">
            <span class="text-white font-medium text-sm uppercase tracking-widest">
                {{ title }}
            </span>
            <button (click)="cerrar.emit()" 
                class="text-white/80 hover:text-white text-2xl leading-none transition">
                &times;
            </button>
            </div>

            <!-- Body -->
            <div class="flex-1 overflow-y-auto" [class]="bodyClass">
                <div *ngIf="loading" class="flex items-center justify-center p-8">
                    <div class="text-center">
                        <div class="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
                        <p class="mt-3 text-sm font-medium text-blue-700">{{ loadingText }}</p>
                    </div>
                    </div>
                    <ng-container *ngIf="!loading">
                    <ng-content></ng-content>
                </ng-container>
            </div>

            <!-- Footer -->
            <div *ngIf="showFooter" 
            class="px-4 py-3 border-t border-gray-200 flex justify-end gap-2 flex-shrink-0">
            <ng-content select="[slot=footer]"></ng-content>
            <button *ngIf="showCerrarBtn"
                (click)="cerrar.emit()"
                class="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition">
                Cerrar
            </button>
            </div>
        </div>
        </div>
    `
})
export class ModalWrapperComponent {
    @Input() title = '';
    @Input() width = '560px';
    @Input() maxHeight = '80vh';
    @Input() leaving = false;
    @Input() showFooter = true;
    @Input() showCerrarBtn = true;
    @Input() bodyClass = 'p-6';
    @Input() loading = false;
    @Input() loadingText = 'Cargando...';
    @Output() cerrar = new EventEmitter<void>();
}