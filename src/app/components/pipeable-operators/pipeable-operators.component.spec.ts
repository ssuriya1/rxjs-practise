import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeableOperatorsComponent } from './pipeable-operators.component';

describe('PipeableOperatorsComponent', () => {
  let component: PipeableOperatorsComponent;
  let fixture: ComponentFixture<PipeableOperatorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipeableOperatorsComponent]
    });
    fixture = TestBed.createComponent(PipeableOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
