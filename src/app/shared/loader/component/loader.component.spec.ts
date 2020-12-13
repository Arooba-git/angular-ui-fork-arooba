import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoaderComponent} from './loader.component';
import {LoaderService} from '../service/loader.service';
import {MaterialModule} from '../../material/material.module';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      providers: [LoaderService],
      imports: [
        MaterialModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
