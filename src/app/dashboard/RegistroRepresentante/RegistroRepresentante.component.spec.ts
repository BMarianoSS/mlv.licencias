import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRepresentanteComponent } from './RegistroRepresentante.component';

describe('RegistroRepresentanteComponent', () => {
  let component: RegistroRepresentanteComponent;
  let fixture: ComponentFixture<RegistroRepresentanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroRepresentanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroRepresentanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
