class Transaction < ApplicationRecord
  before_save :parseLocation
   
  def self.stubData(transactionsData)
    binding.pry
  end

  #need to update model to have a description to parse
  def parseLocation
    dat = self.description.split(/POS/)
    binding.pry
  end

end
