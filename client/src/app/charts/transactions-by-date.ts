export class TransactionsByDate {
  constructor(
    public date: string,
    public debits: number[],
    public credits: number[],
    public balances: number[],
  ){}
}

