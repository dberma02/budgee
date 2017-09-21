import { MyMintCliPage } from './app.po';

describe('my-mint-cli App', () => {
  let page: MyMintCliPage;

  beforeEach(() => {
    page = new MyMintCliPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
