class Transaction < ApplicationRecord
  before_save :parseLocation

  #Fails if the date range does not have any valid data in it
  def self.stubData(start_d, end_d)
    transactions = Transaction.where(date: start_d..end_d).order('date ASC')
    stubbed = []
    prevDate = (start_d)
    count = 0
    date = start_d
    while date < end_d 
      puts date
      if count == transactions.length
        if date == stubbed.last.date
          date = date + 1
          stubbed.push(stub(date, stubbed.last.balance))
        elsif date > stubbed.last.date
          stubbed.push(stub(date, stubbed.last.balance))
          date = date + 1
        end
      elsif transactions[count].date > date and checkLast(stubbed, date)
        if date == start_d
          puts 'start'
          stubbed.push(stub(date, earlierBalance(start_d)))
        else
          stubbed.push(stub(date, stubbed.last.balance))
        end
        date = date + 1
      elsif transactions[count].date == date
        stubbed.push(transactions[count])
        count = count + 1
      elsif (transactions[count].date > date) and stubbed.last.date == date  
        date = date + 1
      end
    end
    stubbed
  end

  def parseLocation
    if self.debit
      dat = self.description.split(/POS/)
      name = dat[0]
      location = dat[1]
      
      self.name = name.sub(/[^a-zA-Z]+$/,"") 
      location = location.sub(/[^a-zA-Z]+$/,"")
      location = location.sub(/^[^a-zA-Z]+/,"")
      location = location.gsub(/\s{2,}/,", ")
      self.location = location.reverse.sub(/\s/," ,").reverse
    end
  end
  
  private 

  def self.stub(date, balance)
    stub = Transaction.new
    stub.date = date
    stub.balance = balance
    stub
  end

  def self.checkLast(stubbedTransactions, date)
    if stubbedTransactions.empty?
      return true
    elsif stubbedTransactions.last.date != date
      return true
    else
      return false
    end
  end

  def self.earlierBalance(start_d)
    date = Transaction.where("date < ?", start_d).maximum(:date)
    #work on what is the best way to grab the balance in this case
    #if this is a day with income may want to grab a different value than if
    #not a day with income. Ordering by date probs doesn't actually do anything,
    #seeing as within day I don't think we have ordering.
    transactions = Transaction.where(date: date).order('date DESC')
    transactions[0].balance
  end

end
