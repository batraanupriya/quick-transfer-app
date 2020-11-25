import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import mockData from "../shared/data/transactions";
import { Transaction } from "../shared/model/transaction";
import { TransformedTransaction } from "../shared/model/transformed-transaction";
import { TransactionData } from "../shared/model/transaction-data";

const categoryCodes = mockData.map((tansaction) => tansaction.categoryCode);

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  private mockTransactionData: Transaction[] = [...mockData];
  private transactions$: BehaviorSubject<Transaction[]> = new BehaviorSubject(
    this.mockTransactionData
  );

  getMockTransactions(): Observable<Transaction[]> {
    return this.transactions$.asObservable();
  }

  getTransactions(): Observable<TransformedTransaction[]> {
    return this.getMockTransactions().pipe(
      map((transactions) => this.transformTransactionData(transactions))
    );
  }

  addTransaction(transactionData: TransactionData): void {
    const request = this.formTransactionRequest(transactionData);
    this.mockTransactionData = [...this.mockTransactionData, request];
    this.transactions$.next(this.mockTransactionData);
  }

  private transformTransactionData(
    transactions: Transaction[]
  ): TransformedTransaction[] {
    return transactions.map((txn) => ({
      date: new Date(txn.dates.valueDate),
      merchant: txn.merchant.name,
      type: txn.transaction.type,
      amount: txn.transaction.amountCurrency.amount,
      currencyCode: txn.transaction.amountCurrency.currencyCode,
      creditDebitIndicator: txn.transaction.creditDebitIndicator,
      categoryCode: txn.categoryCode,
      iconName: this.getIconName(txn.merchant.name),
    }));
  }

  private getIconName(merchant: string): string {
    return merchant.replace(/\s/g, "-").toLowerCase();
  }

  private formTransactionRequest(
    transactionData: TransactionData
  ): Transaction {
    return {
      categoryCode: this.getCategoryCode(),
      dates: {
        valueDate: new Date().getTime(),
      },
      transaction: {
        amountCurrency: {
          amount: transactionData.amount,
          currencyCode: "EUR",
        },
        type: "Online Transfer",
        creditDebitIndicator: "DBIT",
      },
      merchant: {
        name: transactionData.toAccount.name,
        accountNumber: transactionData.toAccount.accountNumber,
      },
    };
  }

  private getCategoryCode(): string {
    const randomNumber = Math.round(Math.random() * categoryCodes.length);
    return categoryCodes[randomNumber];
  }
}
