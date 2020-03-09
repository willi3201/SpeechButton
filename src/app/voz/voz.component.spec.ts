import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VozComponent } from './voz.component';

describe('VozComponent', () => {
  let component: VozComponent;
  let fixture: ComponentFixture<VozComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VozComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VozComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
