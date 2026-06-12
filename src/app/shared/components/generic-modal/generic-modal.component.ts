import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-generic-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './generic-modal.component.html',
    styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent {
    @Input() visible = false;
    @Input() type: 'confirm' | 'info' = 'info';
    @Input() title = '';
    @Input() message = '';
    @Input() confirmText = 'Confirmar';
    @Input() cancelText = 'Cancelar';

    @Output() confirm = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();
    @Output() close = new EventEmitter<void>();

    isLeaving = false;

    requestClose() {
        this.isLeaving = true;
        setTimeout(() => {
            this.isLeaving = false;
            this.close.emit();
        }, 120);
    }

    onConfirm() {
        this.confirm.emit();
        this.requestClose();
    }

    onCancel() {
        this.cancel.emit();
        this.requestClose();
    }
}
