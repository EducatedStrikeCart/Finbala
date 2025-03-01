import axios from "axios";
import { useState } from "react";

export const AddTransaction = (props: { updateList: () => void }) => {
    const [isHidden, setIsHidden] = useState<boolean>(true);

    const hideToggleHandler = () => {
        setIsHidden(!isHidden);
    };

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
        <>
            <button
                className={"btn btn-primary" + (isHidden ? "" : " d-none")}
                onClick={hideToggleHandler}
            >
                Add
            </button>
            <form
                action={submitToDatabase}
                className={isHidden ? " d-none" : " d-flex"}
            >
                <div className="input-group my-3 justify-content-start">
                    <span
                        aria-label="transaction date"
                        className="input-group-text"
                    >
                        Date
                    </span>
                    <input
                        name="transaction-date"
                        className="form-control"
                        type="date"
                        required
                    ></input>

                    <span
                        aria-label="transaction type"
                        className="input-group-text"
                    >
                        Type
                    </span>
                    <select
                        name="transaction-type"
                        className="form-control"
                        required
                    >
                        <option value={"income"}>Income</option>
                        <option value={"expense"}>Expense</option>
                    </select>

                    <span
                        aria-label="transaction name"
                        className="input-group-text"
                    >
                        Name
                    </span>
                    <input
                        name="transaction-name"
                        type="text"
                        className="form-control"
                        required
                    ></input>

                    <span
                        aria-label="transaction amount"
                        className="input-group-text"
                    >
                        Amount
                    </span>
                    <span className="input-group-text">$</span>
                    <input
                        name="transaction-amount"
                        type="text"
                        className="form-control"
                        required
                    ></input>
                </div>
                <button type="submit" className="btn btn-primary m-2">
                    Submit
                </button>
                <button
                    className={
                        "btn btn-danger m-2" + (isHidden ? " d-none" : "")
                    }
                    onClick={hideToggleHandler}
                >
                    Cancel
                </button>
            </form>
        </>
    );
};
