import { ComponentFixture, TestBed } from '@angular/core/testing';

import { registroComponent } from './registro.component';

describe('registroComponent', () => {
  let component: registroComponent;
  let fixture: ComponentFixture<registroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [registroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(registroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
