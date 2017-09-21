module Api
  class TransactionsController < ApplicationController
    require 'pry-rails'
    include ErrorSerializer

    def index

      if format == "chart"
        start_d = DateTime.parse(start_date)
        end_d = DateTime.parse(end_date)

        transactions = Transaction.stubData(start_d, end_d)
      elsif format == "table"
        transactions = Transaction.order('date DESC')
      end
      render json: JSONAPI::Serializer.serialize(
        transactions,
        is_collection: true,
        serializer: Api::TransactionSerializer
      )
     end

    def create
      status = batchCreate
      
      if status == "success"
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

    def createParams
      params.require(:data).permit(attributes: [:debit, :credit, :location, :date, :balance, :category, :name, :description])
    end

    def date_range_params
      params.permit(:start_date, :end_date)
    end
    
    def format
      params.require(:format)
      params[:format]
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
      render json: {errors: ErrorSerializer.serialize(object)}, status: :unprocessable_entity
    end

    def parseDate(dateString)
      dateData = dateString.split('/')
      year = dateData[2].sub(/^/,"20").to_i
      month = dateData[0].to_i
      day = dateData[1].to_i
      date = Date.new(year, month, day)
    end

    def batchCreate
      createParams[:attributes].each do |transaction|
        transaction[:date] = parseDate(transaction[:date])
        Transaction.create(transaction)
      end
      return "success"
    end

  end
end
