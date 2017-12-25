import { TechschoolPage } from './app.po';

describe('techschool App', function() {
  let page: TechschoolPage;

  beforeEach(() => {
    page = new TechschoolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
