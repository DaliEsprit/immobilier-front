import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmobiliereComponent } from './immobiliere.component';

describe('ImmobiliereComponent', () => {
  let component: ImmobiliereComponent;
  let fixture: ComponentFixture<ImmobiliereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmobiliereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmobiliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
