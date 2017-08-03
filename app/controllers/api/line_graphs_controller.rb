module Api
  class LineGraphsController < ApplicationController
    require 'pry-rails'
    include ErrorSerializer


    #revisit whole virtual model thing...not working atm
    #for to return you you want you will have to use a decorator I think,
    #or at least serialize some other object so it can be organized into 
    #parallel arrays

    #actually works okay to test with plain URL
    #date parse works here...not that this is where it should stay
    def index
#     if(start_date && end_date)
#       puts "recieved params"
#       start_d = DateTime.parse(start_date)
#       end_d = DateTime.parse(end_date)
#       #transactions = Transaction.where(date: start_d..end_d).order('date DESC')
#     else
#       graph_data = LineGraphs.order('date DESC')
#     end
      graph_data = Transaction.order('date DESC')
      render json: JSONAPI::Serializer.serialize(
        graph_data,
        is_collection: true,
        serializer: Api::LineGraphSerializer
      )
     end

    def create

    end

    def show

    end

    def update

    end

    def delete

    end

    private
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

