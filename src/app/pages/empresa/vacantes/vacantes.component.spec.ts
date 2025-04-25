import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacantesComponent } from './vacantes.component';

describe('VacantesComponent', () => {
  let component: VacantesComponent;
  let fixture: ComponentFixture<VacantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VacantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
