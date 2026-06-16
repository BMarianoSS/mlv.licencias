import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 bg-white">

        <div class="flex items-center gap-2 text-xs text-gray-500 order-2 sm:order-1">
            <span *ngIf="totalRegistros > 0">
            Mostrando <span class="font-semibold text-gray-700">{{ desde }}</span>
            - <span class="font-semibold text-gray-700">{{ hasta }}</span>
            de <span class="font-semibold text-gray-700">{{ totalRegistros }}</span>
            </span>
            <span *ngIf="totalRegistros === 0">Sin registros</span>
        </div>

        <div class="flex items-center gap-3 order-1 sm:order-2">

            <div class="flex items-center gap-1.5">
            <span class="text-xs text-gray-400 hidden md:inline">Por página</span>
            <select
                [ngModel]="tamanioPagina"
                (ngModelChange)="onTamanioChange($event)"
                class="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 bg-white focus:ring-2 focus:ring-[#1A6DB5] focus:border-transparent outline-none transition cursor-pointer">
                <option *ngFor="let op of opcionesTamanio" [value]="op">{{ op }}</option>
            </select>
            </div>

            <div class="flex items-center gap-1">
            <button (click)="irA(1)" [disabled]="paginaActual === 1"
                class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-[#E8F0FE] hover:text-[#1A6DB5] transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent">
                <span class="material-icons text-[16px]">first_page</span>
            </button>

            <button (click)="irA(paginaActual - 1)" [disabled]="paginaActual === 1"
                class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-[#E8F0FE] hover:text-[#1A6DB5] transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent">
                <span class="material-icons text-[16px]">chevron_left</span>
            </button>

            <div class="flex items-center gap-1.5 px-2 text-xs text-gray-600 font-medium">
                <span class="hidden sm:inline text-gray-400">Página</span>
                <span class="inline-flex items-center justify-center min-w-[26px] h-7 px-1.5 rounded-lg bg-[#1A6DB5] text-white font-bold">
                {{ paginaActual }}
                </span>
                <span class="text-gray-400">de {{ totalPaginas }}</span>
            </div>

            <button (click)="irA(paginaActual + 1)" [disabled]="paginaActual === totalPaginas"
                class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-[#E8F0FE] hover:text-[#1A6DB5] transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent">
                <span class="material-icons text-[16px]">chevron_right</span>
            </button>

            <button (click)="irA(totalPaginas)" [disabled]="paginaActual === totalPaginas"
                class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-[#E8F0FE] hover:text-[#1A6DB5] transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent">
                <span class="material-icons text-[16px]">last_page</span>
            </button>
            </div>

        </div>
    </div>
    `
})
export class PaginationComponent {
    @Input() paginaActual = 1;
    @Input() totalRegistros = 0;
    @Input() tamanioPagina = 8;
    @Input() opcionesTamanio: number[] = [1, 5, 8, 10, 20, 50];

    @Output() paginaChange = new EventEmitter<number>();
    @Output() tamanioPaginaChange = new EventEmitter<number>();

    get totalPaginas(): number {
        return Math.max(1, Math.ceil(this.totalRegistros / this.tamanioPagina));
    }

    get desde(): number {
        if (this.totalRegistros === 0) return 0;
        return (this.paginaActual - 1) * this.tamanioPagina + 1;
    }

    get hasta(): number {
        return Math.min(this.paginaActual * this.tamanioPagina, this.totalRegistros);
    }

    irA(pagina: number) {
        if (pagina < 1 || pagina > this.totalPaginas || pagina === this.paginaActual) return;
        this.paginaChange.emit(pagina);
    }

    onTamanioChange(valor: number) {
        this.tamanioPaginaChange.emit(Number(valor));
    }
}