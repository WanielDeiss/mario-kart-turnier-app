import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartpagePage } from './startpage.page';

describe('StartpagePage', () => {
  let component: StartpagePage;
  let fixture: ComponentFixture<StartpagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartpagePage],
    }).compileComponents();

    fixture = TestBed.createComponent(StartpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
