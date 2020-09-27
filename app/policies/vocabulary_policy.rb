# frozen_string_literal: true

###
# @description: Represents the ability that a user has to access
#   vocabulary records.
###
class VocabularyPolicy < ApplicationPolicy
  def initialize(user, record)
    @user = user || @current_user
    @record = record

    # Signed in users
    raise Pundit::NotAuthorizedError unless user.present?
  end

  ###
  # @description: Determines if the user can see this resource list
  # @return [TrueClass]
  ###
  def index?
    # Signed in users
    @user.present?
  end

  ###
  # @description: Determines if the user can create an instance of this resource
  # @return [TrueClass]
  ###
  def create?
    @user.present?
  end
end
