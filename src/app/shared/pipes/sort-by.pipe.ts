import { Pipe, PipeTransform } from "@angular/core";
import { TransformedTransaction } from "../model/transformed-transaction";

const compareString = (v1: string, v2: string) => v1.localeCompare(v2);
const compareNumber = (v1: number, v2: number) => v1 - v2;
const compareDate = (v1: Date, v2: Date) => v1.getTime() - v2.getTime();

@Pipe({
  name: "sortBy",
})
export class SortByPipe implements PipeTransform {
  transform(
    transactions: TransformedTransaction[],
    direction = "",
    column = "",
    columnType = ""
  ): TransformedTransaction[] {
    if (!column || !direction || !columnType) {
      return transactions;
    } else {
      transactions.sort((a, b) => {
        let res: number;
        const v1 = a[column];
        const v2 = b[column];
        switch (columnType) {
          case "date":
            res = compareDate(v1, v2);
            break;
          case "number":
            res = compareNumber(parseFloat(v1), parseFloat(v2));
            break;
          default:
            res = compareString(v1, v2);
        }
        return direction === "asc" ? res : -res;
      });
      return transactions;
    }
  }
}
