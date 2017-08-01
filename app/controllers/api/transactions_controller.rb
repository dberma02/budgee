module Api
  class TransactionsController < ApplicationController
    require 'pry-rails'
    def index
      transactions = Transaction.order('date DESC')
      render json: JSONAPI::Serializer.serialize(
        transactions,
        is_collection: true,
        serializer: Api::TransactionSerializer
      )
    end

  # def create
  #   
  # end

  # def show

  # end

  # def update

  # end

  # def delete

  # end

  end
end
