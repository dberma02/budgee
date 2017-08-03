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
      transactions = Transaction.new(_params)
      if transactions.save
        render json: transactions, status: 201
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
    def _params
      #  its bc you were putting in the data not in JSON format...
      params.require(:data).require(:attributes).permit(:debit, :credit, :location, :date, :balance, :category, :name, :start_date, :end_date)
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

  end
end
