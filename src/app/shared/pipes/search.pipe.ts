import { Pipe, PipeTransform } from "@angular/core";
import { TransformedTransaction } from "../model/transformed-transaction";

@Pipe({
  name: "search",
})
export class SearchPipe implements PipeTransform {
  transform(
    transactions: TransformedTransaction[],
    text: string = "",
    filterSkipFields: string[] = []
  ): TransformedTransaction[] {
    if (!text) {
      return transactions;
    } else {
      return transactions.filter((transaction) => {
        return (
          Object.keys(transaction)
            .filter((key) => !filterSkipFields.includes(key))
            .filter((key) => {
              return (
                transaction[key] &&
                transaction[key]
                  .toString()
                  .toLowerCase()
                  .includes(text.toLowerCase())
              );
            }).length > 0
        );
      });
    }
  }
}
