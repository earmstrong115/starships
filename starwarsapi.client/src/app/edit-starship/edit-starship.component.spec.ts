import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStarshipComponent } from './edit-starship.component';

describe('EditStarshipComponent', () => {
  let component: EditStarshipComponent;
  let fixture: ComponentFixture<EditStarshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditStarshipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
