import { ComponentFixture, TestBed } from '@angular/core/testing';

import { principalComponent } from './principal.component';

describe('principalComponent', () => {
  let component: principalComponent;
  let fixture: ComponentFixture<principalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [principalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(principalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
