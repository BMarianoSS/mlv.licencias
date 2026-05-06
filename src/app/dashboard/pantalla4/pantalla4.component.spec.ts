import { ComponentFixture, TestBed } from '@angular/core/testing';

import { pantalla4Component } from './pantalla4.component';

describe('pantalla4Component', () => {
  let component: pantalla4Component;
  let fixture: ComponentFixture<pantalla4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [pantalla4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(pantalla4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
