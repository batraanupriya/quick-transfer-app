import { DisplayCurrencySymbolPipe } from './display-currency-symbol.pipe';

describe('DisplayCurrencySymbolPipe', () => {
  it('create an instance', () => {
    const pipe = new DisplayCurrencySymbolPipe();
    expect(pipe).toBeTruthy();
  });
});
