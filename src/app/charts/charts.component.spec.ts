import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailySpendingComponent } from './daily-spending.component';

describe('DailySpendingComponent', () => {
  let component: DailySpendingComponent;
  let fixture: ComponentFixture<DailySpendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailySpendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailySpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
