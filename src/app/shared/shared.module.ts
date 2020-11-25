import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreditDebitIndicatorPipe } from "./pipes/credit-debit-indicator.pipe";
import { SortByPipe } from "./pipes/sort-by.pipe";
import { SearchPipe } from "./pipes/search.pipe";
import { ButtonComponent } from "./button/button.component";
import { HeaderComponent } from "./header/header.component";
import { DisplayCurrencySymbolPipe } from "./pipes/display-currency-symbol.pipe";

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    SortByPipe,
    SearchPipe,
    CreditDebitIndicatorPipe,
    DisplayCurrencySymbolPipe,
  ],
  exports: [
    HeaderComponent,
    ButtonComponent,
    SortByPipe,
    SearchPipe,
    CreditDebitIndicatorPipe,
    DisplayCurrencySymbolPipe,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
