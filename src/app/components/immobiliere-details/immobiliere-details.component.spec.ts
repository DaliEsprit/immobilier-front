import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmobiliereDetailsComponent } from './immobiliere-details.component';

describe('ImmobiliereDetailsComponent', () => {
  let component: ImmobiliereDetailsComponent;
  let fixture: ComponentFixture<ImmobiliereDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmobiliereDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmobiliereDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
