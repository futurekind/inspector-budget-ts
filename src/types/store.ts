import { State as AccountState } from '../types/account';
import { State as TransactionState } from '../types/transactions';

export interface Store {
    accounts: AccountState;
    transactions: TransactionState
}
