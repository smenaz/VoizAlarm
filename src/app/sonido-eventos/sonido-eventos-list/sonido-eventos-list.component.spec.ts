/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SonidoEventosListComponent } from './sonido-eventos-list.component';

describe('SonidoEventosListComponent', () => {
  let component: SonidoEventosListComponent;
  let fixture: ComponentFixture<SonidoEventosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonidoEventosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonidoEventosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
