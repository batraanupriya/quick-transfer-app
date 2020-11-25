import { Component, Input } from "@angular/core";
import { TransformedTransaction } from "src/app/shared/model/transformed-transaction";

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
  NONE = "",
}

export enum SortColumn {
  Date = "date",
  Merchant = "merchant",
  Amount = "amount",
}

export enum ColumnType {
  Date = "date",
  String = "string",
  Number = "number",
}

const rotate: { [key: string]: SortDirection } = {
  asc: SortDirection.DESC,
  desc: SortDirection.ASC,
  "": SortDirection.ASC,
};

@Component({
  selector: "app-transaction-list",
  templateUrl: "./transaction-list.component.html",
  styleUrls: ["./transaction-list.component.scss"],
})
export class TransactionListComponent {
  @Input() transactions: TransformedTransaction[];
  searchText: string;
  columnToBeSorted = SortColumn.Date;
  sortDirection: SortDirection = SortDirection.DESC;
  type = ColumnType.Date;
  ColumnType = ColumnType;
  SortColumn = SortColumn;
  skipFilterOn = ["creditDebitIndicator", "categoryCode"];

  sort(column: SortColumn, type: ColumnType): void {
    if (!this.columnToBeSorted || this.columnToBeSorted === column) {
      this.sortDirection = rotate[this.sortDirection];
    }
    this.type = type;
    this.columnToBeSorted = column;
  }
}
