# frozen_string_literal: true

###
# @description: Represents a Concept Scheme, with is a set of predicates
#   (in form of skos concepts) to map to.
#
#   There's a rake task that will feed the domain sets and predicates by
#   reading and parsing each file inside the "ns" directory.
###
class PredicateSet < ApplicationRecord
  include Slugable
  validates :source_uri, presence: true
  validates :title, presence: true

  belongs_to :strongest_match, class_name: "Predicate", optional: true
  has_one :configuration_profile
  has_many :predicates

  alias_attribute :name, :title

  def max_weight
    predicates.maximum(:weight)
  end

  def to_json_ld
    {
      name: title,
      uri: uri,
      source_uri: source_uri,
      description: description,
      created_at: created_at,
      predicates: predicates.map(&:to_json_ld),
      strongest_match: strongest_match&.source_uri
    }
  end
end
