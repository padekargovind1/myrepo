import { CidePage } from './app.po';

describe('cide App', () => {
  let page: CidePage;

  beforeEach(() => {
    page = new CidePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
