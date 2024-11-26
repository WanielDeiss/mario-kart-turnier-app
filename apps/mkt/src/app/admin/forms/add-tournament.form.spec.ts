import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTournamentForm } from './add-tournament.form';

describe('AddTournamentComponent', () => {
  let component: AddTournamentForm;
  let fixture: ComponentFixture<AddTournamentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTournamentForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTournamentForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
