import { useEffect, useState } from "react";
import { AddTransaction } from "../AddTransaction/AddTransaction";
import { TransactionProp } from "../Transaction/ITransactionProp";
import { Transaction } from "../Transaction/Transaction";
import axios from "axios";

export const TransactionWindow = () => {
    const [transactions, setTransactions] = useState<TransactionProp[]>([]);

    const getTransactions = () => {
        axios
            .get("http://localhost:3000/api/v1/stats")
            // .then((resp) => console.log(resp.data));
            .then((resp) => setTransactions(resp.data));
    };

    useEffect(() => {
        getTransactions();
    }, []);

    return (
        <div className="bg-body-secondary rounded mx-5 p-3">
            <div className="d-flex mx-5 text-white  border-bottom border-white">
                <div className="p-2 col-2">Date</div>
                <div className="p-2 col-2">Type</div>
                <div className="p-2 col-2">Name</div>
                <div className="p-2 flex-grow-1">Amount</div>
            </div>
            {transactions.length > 0
                ? Array.from({ length: transactions.length }, (_, i) => (
                      <Transaction
                          key={i}
                          _id={transactions[i]._id}
                          type={transactions[i].type}
                          displayName={transactions[i].displayName}
                          amount={transactions[i].amount}
                          date={transactions[i].date}
                          updateList={getTransactions}
                      />
                  ))
                : null}
            <AddTransaction updateList={getTransactions} />
        </div>
    );
};
