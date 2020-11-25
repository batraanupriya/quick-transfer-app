import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import userAccountDetails from "../shared/data/user-account-details";
import { Account } from "../shared/model/account";

@Injectable({
  providedIn: "root",
})
export class UserDataService {
  private accountDetails = { ...userAccountDetails };

  private accountDetailsSubject$: BehaviorSubject<
    Account
  > = new BehaviorSubject(this.accountDetails);

  getUserAccountDetails(): Observable<Account> {
    return this.accountDetailsSubject$.asObservable();
  }

  deductBalance(amount: number): void {
    const remainingBalance = this.accountDetails.balance - amount;
    this.accountDetails = {
      ...this.accountDetails,
      ...{ balance: remainingBalance },
    };
    this.accountDetailsSubject$.next(this.accountDetails);
  }
}
