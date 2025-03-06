import axios from "axios";
import { TransactionProp } from "./ITransactionProp";
import { useState } from "react";

export const Transaction = (props: TransactionProp) => {
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [transType, setTransType] = useState<string>(props.type);
    const [displaName, setDisplayName] = useState<string>(props.displayName);
    const [amount, setAmount] = useState<string>(props.amount);

    const editableToggleHandler = () => {
        setIsEditable(!isEditable);
    };

    const [isModalHidden, setIsModalHidden] = useState<Boolean>(true);

    const modalToggleHandler = () => {
        setIsModalHidden(!isModalHidden);
    };

    const deleteHandler = async () => {
        console.log(props._id);
        await axios.delete(`http://localhost:3000/api/v1/stats/${props._id}`);
        props.updateList();
    };

    const submitToDatabase = async (formData: FormData) => {
        let date = formData.get("transaction-date");
        if (date === "") {
            date = props.date;
        }
        const body = {
            date: date,
            type: formData.get("transaction-type"),
            displayName: formData.get("transaction-name"),
            amount: formData.get("transaction-amount"),
        };
        console.log(body);
        await axios
            .patch(`http://localhost:3000/api/v1/stats/${props._id}`, body)
            .then(() => {
                setIsEditable(!isEditable);
                props.updateList();
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="d-flex flex-shrink-0 bg-body-secondary  px-5 mx-5">
            <div className={"w-100" + (isEditable ? " d-none" : " d-flex")}>
                <div className="p-2 col-2">
                    {new Date(props.date).toDateString()}
                </div>
                <div className="p-2 col-2">{props.type}</div>
                <div className="p-2 col-2">{props.displayName}</div>
                <div className="p-2 flex-grow-1">${props.amount}</div>
            </div>
            <form
                className={"w-100" + (isEditable ? " d-flex" : " d-none")}
                action={submitToDatabase}
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
                        value={transType ?? ""}
                        onChange={(e) => setTransType(e.target.value)}
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
                        value={displaName ?? ""}
                        onChange={(e) => setDisplayName(e.target.value)}
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
                        value={amount ?? ""}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    ></input>
                </div>
                <button type="submit" className="btn btn-primary m-2">
                    Submit
                </button>
            </form>

            <button
                className={
                    "btn btn-primary m-2" + (isEditable ? " d-none" : "")
                }
                onClick={editableToggleHandler}
            >
                Edit
            </button>
            <button
                className={"btn btn-danger m-2" + (isEditable ? "" : " d-none")}
                onClick={editableToggleHandler}
            >
                Cancel
            </button>
            <button
                type="button"
                className="btn btn-danger m-2"
                onClick={modalToggleHandler}
            >
                 <span aria-hidden="true">&times;</span>
            </button>
            <div
                className={"modal" + (isModalHidden ? "" : " d-flex")}
                tabIndex={-1}
                role="dialog"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fs-5">Confirm Delete</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={modalToggleHandler}
                            >
                                <span aria-hidden="true"></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Are you sure you want to delete "
                                {props.displayName}"?
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={deleteHandler}
                            >
                                Delete
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={modalToggleHandler}

                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
