import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminStartpagePage } from './admint-startpage.page';

describe('AdminStartpagePage', () => {
  let component: AdminStartpagePage;
  let fixture: ComponentFixture<AdminStartpagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStartpagePage],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminStartpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
