import { TechPortailPage } from './app.po';

describe('tech-portail App', () => {
  let page: TechPortailPage;

  beforeEach(() => {
    page = new TechPortailPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
