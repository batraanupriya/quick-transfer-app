import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TransactionData } from "src/app/shared/model/transaction-data";

@Component({
  selector: "app-preview-transfer",
  templateUrl: "./preview-transfer.component.html",
  styleUrls: ["./preview-transfer.component.scss"],
})
export class PreviewTransferComponent {
  @Input() data: TransactionData;

  constructor(private activeModal: NgbActiveModal) {}

  confirm(): void {
    this.activeModal.close();
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }
}
