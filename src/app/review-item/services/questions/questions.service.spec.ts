import { TestBed } from '@angular/core/testing';

import { QuestionsService } from './questions.service';
import {API} from 'aws-amplify';
import {environment} from '../../../../environments/environment';

describe('QuestionsService', () => {
  let service: QuestionsService;

  beforeEach(() => {
    API.configure({
      endpoints: [
        {
          name: 'api',
          endpoint: environment.api.baseUrl,
          region: 'eu-central-1'
        },
      ]
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
