import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulacionDialogComponent } from './postulacion-dialog.component';

describe('PostulacionDialogComponent', () => {
  let component: PostulacionDialogComponent;
  let fixture: ComponentFixture<PostulacionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostulacionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
