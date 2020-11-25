import { PreviewTransferComponent } from "./preview-transfer/preview-transfer.component";
import { BeneficiaryDataService } from "./../core/beneficiary-data.service";
import { Component, OnInit } from "@angular/core";
import { UserDataService } from "../core/user-data.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TransactionService } from "../core/transaction.service";
import { TransformedTransaction } from "../shared/model/transformed-transaction";
import { Merchant } from "../shared/model/merchant";
import { Account } from "../shared/model/account";
import { Observable } from "rxjs";
import { TransactionData } from "../shared/model/transaction-data";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.scss"],
})
export class TransactionComponent implements OnInit {
  transactions$: Observable<TransformedTransaction[]>;
  merchants$: Observable<Merchant[]>;
  userAccountDetails$: Observable<Account>;

  constructor(
    private transactionsService: TransactionService,
    private merchantsDataService: BeneficiaryDataService,
    private userDataService: UserDataService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.transactions$ = this.transactionsService.getTransactions();
    this.merchants$ = this.merchantsDataService.getBeneficiaryData();
    this.userAccountDetails$ = this.userDataService.getUserAccountDetails();
  }

  initiateTransaction(data: TransactionData): void {
    const modalRef = this.modalService.open(PreviewTransferComponent, {
      centered: true,
    });
    modalRef.componentInstance.data = data;
    modalRef.result
      .then(() => {
        this.transactionsService.addTransaction(data);
        this.userDataService.deductBalance(data.amount);
      })
      .catch(() => {
        console.log("Modal dismissed");
      });
  }
}
