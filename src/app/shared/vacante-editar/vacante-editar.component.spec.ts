import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacanteEditarComponent } from './vacante-editar.component';

describe('VacanteEditarComponent', () => {
  let component: VacanteEditarComponent;
  let fixture: ComponentFixture<VacanteEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacanteEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacanteEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
