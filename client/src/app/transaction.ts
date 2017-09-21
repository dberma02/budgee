export class Transaction {
  constructor(
    public debit: number,
    public credit: number,
    public balance: number,
    public date: string, //not sure this will be correct
    public name: string,
    public location: string,
    public category: string,
    public description: string
  ){}
}
