import { ProviderSwapPage } from './app.po';

describe('provider-swap App', () => {
  let page: ProviderSwapPage;

  beforeEach(() => {
    page = new ProviderSwapPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
