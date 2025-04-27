import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComentarioComponent } from './dialog-comentario.component';

describe('DialogComentarioComponent', () => {
  let component: DialogComentarioComponent;
  let fixture: ComponentFixture<DialogComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComentarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
