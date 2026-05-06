import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pantalla5Component } from './pantalla5.component';

describe('Pantalla5Component', () => {
  let component: Pantalla5Component;
  let fixture: ComponentFixture<Pantalla5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pantalla5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pantalla5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
