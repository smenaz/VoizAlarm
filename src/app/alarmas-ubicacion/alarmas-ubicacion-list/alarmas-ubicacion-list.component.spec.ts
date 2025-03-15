import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmasUbicacionListComponent } from './alarmas-ubicacion-list.component';

describe('AlarmasUbicacionListComponent', () => {
  let component: AlarmasUbicacionListComponent;
  let fixture: ComponentFixture<AlarmasUbicacionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlarmasUbicacionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmasUbicacionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
