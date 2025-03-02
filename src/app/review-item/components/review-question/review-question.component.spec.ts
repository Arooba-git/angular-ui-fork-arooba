import { CdkStepper } from '@angular/cdk/stepper';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '@shared/pipes/pipes.module';
import { MaterialModule } from '@shared/material/material.module';
import { Question } from '../../model/question';
import { QuestionComponent } from '../question/question.component';

import { ReviewQuestionComponent } from './review-question.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-question',
  template: '<div></div>'
})
export class MockQuestionsComponent extends QuestionComponent {}

describe('ReviewQuestionComponent', () => {
  let component: ReviewQuestionComponent;
  let fixture: ComponentFixture<ReviewQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewQuestionComponent, MockQuestionsComponent],
      imports: [MaterialModule, FormsModule, PipesModule],
      providers: [{ provide: CdkStepper, useValue: {} }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewQuestionComponent);
    component = fixture.componentInstance;

    component.question = { options: [] } as Question;
    component.childQuestions = [];
    component.index = 0;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
