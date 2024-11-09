from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from collections import defaultdict

app = FastAPI(openapi_url="/optimizetka/openapi.json", docs_url="/optimizetka/docs")


class Participant(BaseModel):
    id: int
    name: str


class Position(BaseModel):
    price: float
    assigned_to_ids: List[int]


class Transaction(BaseModel):
    owner_id: int
    positions: List[Position]


class InputData(BaseModel):
    participants: List[Participant]
    transactions: List[Transaction]


class Debt(BaseModel):
    from_user_id: int
    to_user_id: int
    amount: float


@app.post("/optimizetka/api/calculate-debts", response_model=List[Debt])
def calculate_debts(data: InputData) -> List[Debt]:
    balances = defaultdict(float)

    for transaction in data.transactions:
        owner_id = transaction.owner_id
        for position in transaction.positions:
            price = position.price
            assigned_to_ids = position.assigned_to_ids
            share = price / len(assigned_to_ids)

            for participant_id in assigned_to_ids:
                if participant_id != owner_id:
                    balances[participant_id] -= share
                    balances[owner_id] += share

    debts = []
    creditors = [(p, amount) for p, amount in balances.items() if amount > 0]
    debtors = [(p, -amount) for p, amount in balances.items() if amount < 0]

    i, j = 0, 0
    while i < len(creditors) and j < len(debtors):
        creditor_id, credit_amount = creditors[i]
        debtor_id, debt_amount = debtors[j]

        payment = min(credit_amount, debt_amount)

        debts.append(
            {
                "from_user_id": debtor_id,
                "to_user_id": creditor_id,
                "amount": round(payment, 2),
            }
        )

        creditors[i] = (creditor_id, credit_amount - payment)
        debtors[j] = (debtor_id, debt_amount - payment)

        if creditors[i][1] == 0:
            i += 1
        if debtors[j][1] == 0:
            j += 1

    return debts
