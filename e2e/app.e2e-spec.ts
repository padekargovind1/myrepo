import { CideFrontPage } from './app.po';

describe('cide-front App', () => {
  let page: CideFrontPage;

  beforeEach(() => {
    page = new CideFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
