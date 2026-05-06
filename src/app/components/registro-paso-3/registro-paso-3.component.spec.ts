import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPaso3Component } from './registro-paso-3.component';

describe('RegistroPaso3Component', () => {
  let component: RegistroPaso3Component;
  let fixture: ComponentFixture<RegistroPaso3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPaso3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPaso3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
