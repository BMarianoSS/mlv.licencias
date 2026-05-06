import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGiroComponent } from './modal-giro.component';

describe('ModalGiroComponent', () => {
  let component: ModalGiroComponent;
  let fixture: ComponentFixture<ModalGiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalGiroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
