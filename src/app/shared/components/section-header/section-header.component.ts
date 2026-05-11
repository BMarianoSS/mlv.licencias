import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-section-header',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div [class]="wrapperClass">
      <span class="text-xs font-medium text-gray-500 uppercase tracking-widest">
        {{ title }}
      </span>
      <span *ngIf="badge" 
        class="text-xs font-medium text-gray-400 normal-case tracking-normal">
        {{ badge }}
      </span>
    </div>
    <div *ngIf="divider" class="h-px bg-gray-200 mt-2 mb-4"></div>
  `
})
export class SectionHeaderComponent {
    @Input() title = '';
    @Input() badge = '';           // ej: "(de corresponder)"
    @Input() divider = true;
    @Input() wrapperClass = 'flex items-center gap-2';
}