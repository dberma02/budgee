module Api
  class TransactionsController < ApplicationController
    require 'pry-rails'
    include ErrorSerializer

    #actually works okay to test with plain URL
    #date parse works here...not that this is where it should stay
    def index
      if(start_date && end_date)
        puts "recieved params"
        start_d = DateTime.parse(start_date)
        end_d = DateTime.parse(end_date)
        transactions = Transaction.where(date: start_d..end_d).order('date DESC')
      else
        transactions = Transaction.order('date DESC')
      end
      render json: JSONAPI::Serializer.serialize(
        transactions,
        is_collection: true,
        serializer: Api::TransactionSerializer
      )
     end

    def create
      #need to make this create all transactions in a loop
      status = batchCreate
      
      if status == "success"
        #okay to do this here bc before they get rendered, will have to go through
        #decorator which will insert stub data
        #
        #figure out how to do response here
        #can either not send the confirmation or pass an array of the objects to be serialized
        render json: { status: 201 }
      else
        respond_with_errors(transactions)
      end
    end

    def show

    end

    def update

    end

    def delete

    end

    private
    def createParams
      #  its bc you were putting in the data not in JSON format...
      params.require(:data).permit(attributes: [:debit, :credit, :location, :date, :balance, :category, :name, :description])
    end

    def date_range_params
      params.permit(:start_date, :end_date)
    end
    
    def start_date
      params.require(:start_date)
      params[:start_date]
    end

    def end_date
      params.require(:end_date)
      params[:end_date]
    end

    def respond_with_errors(object)
      render json: {"DANIEL":"BERMAN"}
      render json: {errors: ErrorSerializer.serialize(object)}, status: :unprocessable_entity
    end

    def batchCreate
      createParams[:attributes].each do |transaction|
        Transaction.create(transaction)
#       unless transaction.save
#         return "error" 
#       end
      end
      return "success"
    end

  end
end
