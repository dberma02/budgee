export class Transaction {
  constructor(
    public debit: number,
    public credit: number,
    public balance: number,
    public date: string, //not sure this will be correct
    public description: string,
    public category: string
  ){}
}
