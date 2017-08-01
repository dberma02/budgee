module Api
  class TransactionSerializer < BaseSerializer
    attributes(
      :debit, :credit, :balance, :date, :name, :location, :category
    )
  end
end
