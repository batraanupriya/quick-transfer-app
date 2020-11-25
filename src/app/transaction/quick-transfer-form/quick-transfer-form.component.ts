import {
  Component,
  EventEmitter,
  Output,
  Input,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { Merchant } from "src/app/shared/model/merchant";
import { TransactionData } from "src/app/shared/model/transaction-data";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Observable } from "rxjs";
import { distinctUntilChanged, debounceTime, map } from "rxjs/operators";
import { Account } from "../../shared/model/account";
import { DisplayCurrencySymbolPipe } from "../../shared/pipes/display-currency-symbol.pipe";

interface InputError {
  [key: string]: boolean;
}

@Component({
  selector: "app-quick-transfer-form",
  templateUrl: "./quick-transfer-form.component.html",
  styleUrls: ["./quick-transfer-form.component.scss"],
  providers: [DisplayCurrencySymbolPipe],
})
export class QuickTransferFormComponent implements OnChanges {
  @Input() merchants: Merchant[];
  @Input() userAccount: Account;
  @Output() initiateTransaction = new EventEmitter<TransactionData>();
  transferForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private displayCurrencySymbolPipe: DisplayCurrencySymbolPipe
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userAccount && changes.userAccount.currentValue) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.transferForm = this.fb.group({
      fromAccount: [
        {
          value: this.fromAccountDisplayValue(),
          disabled: true,
        },
      ],
      toAccount: [undefined, Validators.required],
      amount: [undefined, [Validators.required, this.validateAmount()]],
    });
  }

  private fromAccountDisplayValue(): string {
    const userAccount = this.userAccount;
    const name = userAccount.name;
    const balance = userAccount.balance;
    const currencyCode = this.displayCurrencySymbolPipe.transform(
      this.userAccount.currencyCode
    );
    const accountNumber = userAccount.accountNumber.slice(-4);
    return `${name}(${accountNumber}) - ${currencyCode}${balance}`;
  }

  private validateAmount(): (contol: AbstractControl) => InputError {
    return (contol: AbstractControl): InputError => {
      const balance = this.userAccount.balance;
      if (balance - contol.value < -500) {
        return { overdraft: true };
      } else if (
        !/^\d+(?:\.\d{0,2})?$/g.test(contol.value) ||
        contol.value === 0
      ) {
        return { invalidAmount: true };
      }
      return null;
    };
  }

  formatter = (merchant: Merchant) => merchant.name;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term === ""
          ? []
          : this.merchants
              .filter(
                (v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  get amount(): AbstractControl {
    return this.transferForm.get("amount");
  }

  onSubmit(): void {
    const transactionData = {
      ...this.transferForm.value,
      ...{ fromAccount: this.userAccount },
    };
    this.initiateTransaction.emit(transactionData);
  }
}
