import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPaso1Component } from './registro-paso-1.component';

describe('RegistroPaso1Component', () => {
  let component: RegistroPaso1Component;
  let fixture: ComponentFixture<RegistroPaso1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPaso1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPaso1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
