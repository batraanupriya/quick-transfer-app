import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TransactionService } from "./transaction.service";
import { Merchant } from "../shared/model/merchant";

@Injectable({
  providedIn: "root",
})
export class BeneficiaryDataService {
  constructor(private transactionService: TransactionService) {}

  getBeneficiaryData(): Observable<Merchant[]> {
    return this.transactionService.getMockTransactions().pipe(
      map((transactions) => {
        return transactions
          .map((transaction) => transaction.merchant)
          .reduce((merchants, currentMerchant) => {
            if (
              !merchants.find(
                (merchant) => merchant.name === currentMerchant.name
              )
            ) {
              merchants.push(currentMerchant);
            }
            return merchants;
          }, []);
      })
    );
  }
}
