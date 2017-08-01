require 'jsonapi-serializers'
module Api
  class BaseSerializer
    include JSONAPI::Serializer

    attribute :title
    attribute :content
  end
end
