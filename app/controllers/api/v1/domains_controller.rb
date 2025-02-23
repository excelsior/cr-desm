# frozen_string_literal: true

###
# @description: Place all the actions related to domains
###
class API::V1::DomainsController < ApplicationController
  before_action :with_instance, only: :show

  ###
  # @description: Lists all the domains
  ###
  def index
    render json: current_configuration_profile.domains.includes(:spine)
  end

  ###
  # @description: Returns the domain with id equal to the one passed in params
  ###
  def show
    render json: @instance
  end
end
