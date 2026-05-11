import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDahsbordComponent } from './user-dahsbord.component';

describe('UserDahsbordComponent', () => {
  let component: UserDahsbordComponent;
  let fixture: ComponentFixture<UserDahsbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDahsbordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDahsbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
