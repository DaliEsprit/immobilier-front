import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormImmobilierComponent } from './form-immobilier.component';

describe('FormImmobilierComponent', () => {
  let component: FormImmobilierComponent;
  let fixture: ComponentFixture<FormImmobilierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormImmobilierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormImmobilierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
