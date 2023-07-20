import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierImmobilierComponent } from './modifier-immobilier.component';

describe('ModifierImmobilierComponent', () => {
  let component: ModifierImmobilierComponent;
  let fixture: ComponentFixture<ModifierImmobilierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierImmobilierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierImmobilierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
