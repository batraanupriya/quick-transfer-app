import { Component, Input } from "@angular/core";
import { TransformedTransaction } from "src/app/shared/model/transformed-transaction";

@Component({
  selector: "app-transaction-row",
  templateUrl: "./transaction-row.component.html",
  styleUrls: ["./transaction-row.component.scss"],
})
export class TransactionRowComponent {
  @Input() transaction: TransformedTransaction;

  getIconPath(iconName: string): string {
    return `../../../assets/icons/${iconName}.png`;
  }
}
