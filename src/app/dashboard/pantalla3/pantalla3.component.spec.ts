import { ComponentFixture, TestBed } from '@angular/core/testing';

import { pantalla3Component } from './pantalla3.component';

describe('pantalla3Component', () => {
  let component: pantalla3Component;
  let fixture: ComponentFixture<pantalla3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [pantalla3Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(pantalla3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
