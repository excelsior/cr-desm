# frozen_string_literal: true

###
# @description: Represents a node of a specification
###
class Term < ApplicationRecord
  include Slugable

  belongs_to :configuration_profile_user

  ###
  # @description: The specifications in which this term appears. Can be many
  ###
  has_and_belongs_to_many :specifications

  has_one :configuration_profile, through: :configuration_profile_user

  has_one :mapping_predicates, through: :configuration_profile

  has_one :organization, through: :configuration_profile_user

  ###
  # @description: The property for this term, an entity that contains all the rdf property information
  ###
  has_one :property, dependent: :destroy

  has_many :alignments, foreign_key: :spine_term_id
  has_many :alignment_vocabularies, through: :alignments

  ###
  # @description: The skos concept scheme (vocabulary), for this term. It can be many, but in the most
  #   common situations, each term will have 0 or 1 vocabulary
  ###
  has_and_belongs_to_many :vocabularies

  validates :name, presence: true
  validates :raw, presence: true

  ###
  # @description: Accept to update and/or create properties along with terms
  ###
  accepts_nested_attributes_for :property, allow_destroy: true

  after_create :assign_property, unless: proc { property.present? }

  ###
  # @description: Include additional information about the specification in
  #   json responses. This overrides the ApplicationRecord as_json method.
  ###
  def as_json(options={})
    super options.merge(methods: %i[max_mapping_weight uri organization])
  end

  def max_mapping_weight
    mapping_predicates.max_weight * configuration_profile.standards_organizations.count
  end

  ###
  # @description: Build and return the uri with the "desm" prefix
  # @return [String]: the desm namespaced uri
  ###
  def desm_uri domain=nil
    "desm-#{organization.name.downcase.strip}-#{domain&.pref_label&.downcase&.strip}:#{uri.split(':').last}"
  end

  def assign_property
    parser = Parsers::JsonLd::Node.new(raw)
    domain = parser.read_as_array("domain")
    range = parser.read_as_array("range")

    Property.create!(
      term: self,
      uri: uri,
      source_uri: parser.read!("id"),
      comment: parser.read!("comment"),
      label: parser.read!("label") || parser.read!("id"),
      domain: domain,
      selected_domain: domain&.first,
      range: range,
      selected_range: range&.first,
      subproperty_of: parser.read!("subproperty")
    )
  end
end
