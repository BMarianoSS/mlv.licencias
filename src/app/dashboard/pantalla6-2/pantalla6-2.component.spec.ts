import { ComponentFixture, TestBed } from '@angular/core/testing';

import { pantalla62Component } from './pantalla6-2.component';

describe('pantalla62Component', () => {
  let component: pantalla62Component;
  let fixture: ComponentFixture<pantalla62Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [pantalla62Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(pantalla62Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
