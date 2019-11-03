import { TestBed } from '@angular/core/testing';

import { PanelactionService } from './panelaction.service';

describe('PanelactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PanelactionService = TestBed.get(PanelactionService);
    expect(service).toBeTruthy();
  });
});
