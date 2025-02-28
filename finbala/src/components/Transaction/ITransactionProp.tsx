export interface TransactionProp {
    _id: string;
    type: string; // Income or expense
    displayName: string; // Name to be displayed to users
    amount: string;
    date: string;
    updateList: () => void;
}
