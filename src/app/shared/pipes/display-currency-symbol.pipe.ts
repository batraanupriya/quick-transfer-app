import { Pipe, PipeTransform } from "@angular/core";

enum CurrencySymbol {
  EUR = "€",
}

@Pipe({
  name: "displayCurrencySymbol",
})
export class DisplayCurrencySymbolPipe implements PipeTransform {
  transform(value: string): CurrencySymbol {
    return CurrencySymbol[value.toUpperCase()];
  }
}
