import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBootstrapComponent } from './test-bootstrap.component';

describe('TestBootstrapComponent', () => {
  let component: TestBootstrapComponent;
  let fixture: ComponentFixture<TestBootstrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestBootstrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
