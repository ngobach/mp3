import { Mp3Page } from './app.po';

describe('mp3 App', function() {
  let page: Mp3Page;

  beforeEach(() => {
    page = new Mp3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
