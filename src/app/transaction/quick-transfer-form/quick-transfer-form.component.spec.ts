import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickTransferFormComponent } from './quick-transfer-form.component';

describe('QuickTransferFormComponent', () => {
  let component: QuickTransferFormComponent;
  let fixture: ComponentFixture<QuickTransferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickTransferFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickTransferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
