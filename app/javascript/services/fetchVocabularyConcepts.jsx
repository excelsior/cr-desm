import apiRequest from "./api/apiRequest";

const fetchVocabularyConcepts = async (vocabId) => {
  const response = await apiRequest({
    url: "/api/v1/vocabularies/" + vocabId,
    defaultResponse: [],
    successResponse: "vocabulary",
    method: "get",
  });

  if (response.error) {
    return response;
  }

  return shapeConcepts(response.vocabulary.concepts);
};

/**
 * Give the concept list a proper shape to manipulate the data.
 * The backend is returning to us a list of raw concepts in json-ld
 * We need simpler names on the atrributes
 *
 * @param {Array} rawConceptList
 */
const shapeConcepts = (rawConceptList) => {
  return rawConceptList.map((rawConcept) => {
    return {
      name: rawConcept.raw.prefLabel["en-us"],
      definition: rawConcept.raw.definition["en-us"],
      id: rawConcept["id"],
    };
  });
};

export default fetchVocabularyConcepts;
