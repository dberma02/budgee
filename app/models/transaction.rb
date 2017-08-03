class Transaction < ApplicationRecord
  
  def self.stubData(transactions)
    binding.pry
    transactions[:attributes].each do |transaction|
      newT = Transaction.new(transaction)
      newT = parseLocation(newT)
      Transaction.save(newT)
    end
  end

  #need to update model to have a description to parse
  def self.parseLocation(transaction)
    binding.pry
  end

end
