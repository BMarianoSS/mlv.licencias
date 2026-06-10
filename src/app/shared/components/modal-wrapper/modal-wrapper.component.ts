import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modal-wrapper',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
            <div 
                [class]="leaving ? 'modal-leave' : 'modal-enter'"
                [ngStyle]="{ width: width, maxHeight: maxHeight }"
                class="bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden w-full">

                <!-- Header -->
                <div class="flex justify-between items-center px-5 py-3.5 border-b border-gray-200 flex-shrink-0"
                    style="background: linear-gradient(135deg, #0F2D5C 0%, #1A6DB5 100%);">
                    <span class="text-white font-semibold text-sm tracking-wide flex items-center gap-2">
                    <span class="w-1.5 h-4 rounded-full bg-white/40 inline-block"></span>
                    {{ title }}
                    </span>
                    <button *ngIf="showCerrarBtn" (click)="cerrar.emit()"
                    class="text-white/70 hover:text-white w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/20 transition text-lg leading-none">
                    &times;
                    </button>
                </div>

                <!-- Body -->
                <div class="flex-1 overflow-y-auto" [class]="bodyClass">
                    <div *ngIf="loading" class="flex items-center justify-center p-10">
                    <div class="text-center">
                        <div class="inline-block animate-spin rounded-full h-9 w-9 border-b-2 border-[#1A6DB5]"></div>
                        <p class="mt-3 text-sm font-medium text-[#1A6DB5]">{{ loadingText }}</p>
                    </div>
                    </div>
                    <ng-container *ngIf="!loading">
                    <ng-content></ng-content>
                    </ng-container>
                </div>

                <!-- Footer -->
                <div *ngIf="showFooter"
                    class="px-4 py-3 border-t border-gray-200 bg-gray-50 flex justify-end gap-2 flex-shrink-0">
                    <ng-content select="[slot=footer]"></ng-content>
                    <button *ngIf="showCerrarBtn"
                    (click)="cerrar.emit()"
                    class="inline-flex items-center gap-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition">
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