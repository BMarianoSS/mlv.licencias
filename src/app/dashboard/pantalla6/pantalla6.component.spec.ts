import { ComponentFixture, TestBed } from '@angular/core/testing';

import { pantalla6Component } from './pantalla6.component';

describe('pantalla6Component', () => {
  let component: pantalla6Component;
  let fixture: ComponentFixture<pantalla6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [pantalla6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(pantalla6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
