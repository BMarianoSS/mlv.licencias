import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
    label: string;
    key?: string;
    align?: 'left' | 'center' | 'right';
    mono?: boolean;
    actions?: boolean;
}

@Component({
    selector: 'app-data-table',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="overflow-hidden">
        <table class="w-full text-sm text-left">
            <thead>
            <tr style="background: #F7F9FC;">
                <th *ngFor="let col of columns"
                    class="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200"
                    [class.text-center]="col.align === 'center'"
                    [class.text-right]="col.align === 'right'">
                {{ col.label }}
                </th>
            </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-100">

            <tr *ngIf="loading">
                <td [attr.colspan]="columns.length" class="py-12 text-center">
                <div class="inline-block animate-spin rounded-full h-7 w-7 border-b-2 border-[#1A6DB5]"></div>
                <p class="mt-2 text-xs text-[#1A6DB5] font-medium">{{ loadingText }}</p>
                </td>
            </tr>

            <tr *ngIf="!loading && rows.length === 0">
                <td [attr.colspan]="columns.length" class="py-12 text-center">
                <span class="material-icons text-gray-300 text-4xl block mb-2">inbox</span>
                <p class="text-sm text-gray-400">{{ emptyText }}</p>
                </td>
            </tr>

            <tr *ngFor="let row of rows; let i = index"
                class="hover:bg-[#E8F0FE]/30 transition-colors"
                [class.cursor-pointer]="selectable"
                (click)="selectable && rowClick.emit(row)">

                <td *ngFor="let col of columns"
                    class="px-4 py-3 text-gray-700"
                    [class.text-center]="col.align === 'center'"
                    [class.text-right]="col.align === 'right'"
                    [class.font-mono]="col.mono"
                    [class.text-xs]="col.mono">

                <ng-container *ngIf="col.actions && actionsTpl">
                    <ng-container *ngTemplateOutlet="actionsTpl; context: { $implicit: row, index: i }">
                    </ng-container>
                </ng-container>

                <span *ngIf="!col.actions">
                    {{ col.key ? row[col.key] : '' }}
                </span>

                </td>
            </tr>

            </tbody>
        </table>
    </div>
    `
})
export class DataTableComponent {
    @Input() columns: TableColumn[] = [];
    @Input() rows: any[] = [];
    @Input() loading = false;
    @Input() loadingText = 'Cargando...';
    @Input() emptyText = 'No hay registros';
    @Input() selectable = false;
    @Input() actionsTpl!: TemplateRef<any>;

    @Output() rowClick = new EventEmitter<any>();
}