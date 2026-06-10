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
    <div class="border border-gray-200 rounded-xl overflow-hidden">
        <table class="w-full text-sm text-left">

            <thead class="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
                <th *ngFor="let col of columns"
                    class="px-4 py-2.5 border-b border-gray-200 font-medium"
                    [class.text-center]="col.align === 'center'"
                    [class.text-right]="col.align === 'right'">
                {{ col.label }}
                </th>
            </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-100">

            <tr *ngIf="loading">
                <td [attr.colspan]="columns.length" class="py-10 text-center">
                <div class="inline-block animate-spin rounded-full h-7 w-7 border-b-2 border-blue-700"></div>
                <p class="mt-2 text-xs text-blue-700">{{ loadingText }}</p>
                </td>
            </tr>

            <tr *ngIf="!loading && rows.length === 0">
                <td [attr.colspan]="columns.length"
                    class="py-10 text-center text-gray-400 text-sm">
                {{ emptyText }}
                </td>
            </tr>

            <tr *ngFor="let row of rows; let i = index"
                class="hover:bg-gray-50 transition"
                [class.cursor-pointer]="selectable"
                (click)="selectable && rowClick.emit(row)">

                <td *ngFor="let col of columns"
                    class="px-4 py-3"
                    [class.text-center]="col.align === 'center'"
                    [class.text-right]="col.align === 'right'"
                    [class.font-mono]="col.mono"
                    [class.text-xs]="col.mono">

                <ng-container *ngIf="col.actions && actionsTpl">
                    <ng-container
                    *ngTemplateOutlet="actionsTpl; context: { $implicit: row, index: i }">
                    </ng-container>
                </ng-container>

                <span *ngIf="!col.actions" class="text-gray-700">
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