import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRepresentanteComponent } from './modal-representante.component';

describe('ModalRepresentanteComponent', () => {
  let component: ModalRepresentanteComponent;
  let fixture: ComponentFixture<ModalRepresentanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRepresentanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRepresentanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
