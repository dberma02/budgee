module Api
  class TransactionsControllerIndex
  delegate_all
#   delegate :params, to: :controller
#   delegate :date_range_params, to: :controller
#   delegate :start_date, to: :controller
#   delegate :end_date, to: :controller
    
    def resources
      @resources = Transaction.where(date: start_d..end_d).order('date DESC')   
    end
  end
end
