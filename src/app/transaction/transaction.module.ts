import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TransactionRoutingModule } from "./transaction-routing.module";
import { TransactionComponent } from "./transaction.component";
import { TransactionListComponent } from "./transaction-list/transaction-list.component";
import { QuickTransferFormComponent } from "./quick-transfer-form/quick-transfer-form.component";
import { PreviewTransferComponent } from "./preview-transfer/preview-transfer.component";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TransactionRowComponent } from "./transaction-list/transaction-row/transaction-row.component";

@NgModule({
  declarations: [
    TransactionComponent,
    TransactionListComponent,
    TransactionRowComponent,
    QuickTransferFormComponent,
    PreviewTransferComponent,
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ],
})
export class TransactionModule {}
