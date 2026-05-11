import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'app-form-field',
    standalone: true,
    imports: [CommonModule, FormsModule],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FormFieldComponent),
        multi: true
    }],
    template: `
        <div [class]="wrapperClass">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-widest mb-1">
                {{ label }}
                <span *ngIf="required" class="text-red-500">*</span>
            </label>

            <input *ngIf="type !== 'select'"
                [type]="type"
                [placeholder]="placeholder"
                [attr.maxlength]="maxlength || 999999"
                [disabled]="disabled"
                [step]="step || null"
                [ngClass]="disabled 
                ? 'bg-gray-50 cursor-not-allowed' 
                : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'"
                class="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg outline-none transition"
                [value]="value"
                (input)="onInput($event)"
                (blur)="onTouched()">

            <select *ngIf="type === 'select'"
                [disabled]="disabled"
                class="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                [value]="value"
                (change)="onInput($event)">
                <option value="">Seleccione</option>
                <ng-content></ng-content>
            </select>

        <p *ngIf="error" class="text-xs text-red-500 mt-1">{{ error }}</p>
        </div>
    `
})
export class FormFieldComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() type: 'text' | 'number' | 'email' | 'password' | 'date' | 'time' | 'tel' | 'select' = 'text';
    @Input() placeholder = '';
    @Input() required = false;
    @Input() disabled = false;
    @Input() maxlength: number | null = null;
    @Input() step: string | null = null;
    @Input() error = '';
    @Input() wrapperClass = '';

    value: any = '';
    onChange = (_: any) => { };
    onTouched = () => { };

    writeValue(val: any) { this.value = val; }
    registerOnChange(fn: any) { this.onChange = fn; }
    registerOnTouched(fn: any) { this.onTouched = fn; }
    setDisabledState(disabled: boolean) { this.disabled = disabled; }

    onInput(event: any) {
        const val = event.target.value;
        this.value = val;
        this.onChange(val);
    }
}