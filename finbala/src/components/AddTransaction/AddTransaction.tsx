import axios from "axios";

export const AddTransaction = (props: { updateList: () => void }) => {
    const submitToDatabase = async (formData: FormData) => {
        const body = {
            date: formData.get("transaction-date"),
            type: formData.get("transaction-type"),
            displayName: formData.get("transaction-name"),
            amount: formData.get("transaction-amount"),
        };
        await axios
            .post("http://localhost:3000/api/v1/stats", body)
            .catch((err) => {
                console.log(err);
            })
            .finally(() => props.updateList());
    };

    return (
        <form action={submitToDatabase}>
            <div className="input-group my-3 justify-content-start">
                <span aria-label="transaction date">
                    Date
                    <input
                        name="transaction-date"
                        className="form-control"
                        type="date"
                    ></input>
                </span>
                <span
                    aria-label="transaction type"
                    className="input-group-text"
                >
                    Type
                    <select name="transaction-type" className="form-control">
                        <option value={"income"}>Income</option>
                        <option value={"expense"}>Expense</option>
                    </select>
                </span>
                <span
                    aria-label="transaction name"
                    className="input-group-text"
                >
                    Name
                    <input
                        name="transaction-name"
                        type="text"
                        className="form-control"
                    ></input>
                </span>
                <span
                    aria-label="transaction amount"
                    className="input-group-text"
                >
                    Amount
                    <input
                        name="transaction-amount"
                        type="text"
                        className="form-control"
                    ></input>
                </span>
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
};
