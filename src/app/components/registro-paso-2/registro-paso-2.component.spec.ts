import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPaso2Component } from './registro-paso-2.component';

describe('RegistroPaso2Component', () => {
  let component: RegistroPaso2Component;
  let fixture: ComponentFixture<RegistroPaso2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPaso2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPaso2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
