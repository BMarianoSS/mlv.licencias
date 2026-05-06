import { ComponentFixture, TestBed } from '@angular/core/testing';

import { pantalla1Component } from './pantalla1.component';

describe('pantalla1Component', () => {
  let component: pantalla1Component;
  let fixture: ComponentFixture<pantalla1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [pantalla1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(pantalla1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
