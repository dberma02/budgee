module Api
  class LineGraphSerializer < BaseSerializer
    attributes(
      :balance, :date, :description
    )

    attribute :description do
      desc =
         "#{object.name}   #{object.location}    #{object.category}"
    end

  end
end

