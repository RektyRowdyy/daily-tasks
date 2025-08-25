import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwaStatus } from './pwa-status';

describe('PwaStatus', () => {
  let component: PwaStatus;
  let fixture: ComponentFixture<PwaStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PwaStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PwaStatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
