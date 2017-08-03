module Api
  class TransactionSerializer < BaseSerializer
    attributes(
      :debit, :credit, :balance, :date, :name, :location, :category, :description
    )

    attribute :description do
      desc =
         "#{object.name}   #{object.location}    #{object.category}"
    end
  end
end
