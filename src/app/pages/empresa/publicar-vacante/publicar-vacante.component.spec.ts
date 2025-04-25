import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarVacanteComponent } from './publicar-vacante.component';

describe('PublicarVacanteComponent', () => {
  let component: PublicarVacanteComponent;
  let fixture: ComponentFixture<PublicarVacanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicarVacanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicarVacanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
