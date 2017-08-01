class CreateTransactions < ActiveRecord::Migration[5.1]
  def change
    create_table :transactions do |t|
      t.float :debit
      t.float :credit
      t.float :balance
      t.date :date
      t.string :name
      t.text :location
      t.string :category

      t.timestamps
    end
  end
end
