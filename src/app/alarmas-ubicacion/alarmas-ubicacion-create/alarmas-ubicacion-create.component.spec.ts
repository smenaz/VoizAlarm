import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmasUbicacionCreateComponent } from './alarmas-ubicacion-create.component';

describe('AlarmasUbicacionCreateComponent', () => {
  let component: AlarmasUbicacionCreateComponent;
  let fixture: ComponentFixture<AlarmasUbicacionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmasUbicacionCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmasUbicacionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
