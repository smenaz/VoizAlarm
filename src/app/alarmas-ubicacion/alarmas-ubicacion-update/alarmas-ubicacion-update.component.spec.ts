import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmasUbicacionUpdateComponent } from './alarmas-ubicacion-update.component';

describe('AlarmasUbicacionUpdateComponent', () => {
  let component: AlarmasUbicacionUpdateComponent;
  let fixture: ComponentFixture<AlarmasUbicacionUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmasUbicacionUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmasUbicacionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
