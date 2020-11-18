import React, { useEffect, useState } from "react";
import fetchAudits from "../../../services/fetchAudits";
import Collapsible from "../../shared/Collapsible";
import ChangeDetails from "./ChangeDetails";
import Moment from "moment";

/**
 * @description Renders a card with information about the changes in the mapping provided
 *   in props. The information is fetched from the api service.
 *
 * Props:
 * @param {Array} mappingTerms
 * @param {Array} spineTerms
 * @param {Array} predicates
 */
const MappingChangeLog = (props) => {
  /**
   * Elements from props
   */
  const { mappingTerms, spineTerms, predicates } = props;
  /**
   * The changes data (JSON)
   */
  const [changes, setChanges] = useState([]);

  /**
   * Manage to get the changes from the api service
   */
  const handleFetchChanges = async () => {
    // Get changes from the api service
    let response = await fetchAudits({
      className: "MappingTerm",
      instanceIds: mappingTerms.map((mt) => mt.id),
      auditAction: "update",
    });

    setChanges(response.audits);
  };

  /**
   * Use effect with an emtpy array as second parameter, will trigger the action of fetching the changes
   * at the 'mounted' event of this functional component (It's not actually mounted, but
   * it mimics the same action).
   */
  useEffect(() => {
    handleFetchChanges();
  }, []);

  /**
   * Presentation of the changes when fetched
   */
  const ChangelogStruct = () => {
    if (!_.isEmpty(changes)) {
      return (
        <ul>
          {changes.map((change, i) => {
            return (
              <li key={i}>
                <div className="ml-3">
                  <div className="row">
                    {/* <strong>{change.created_at}</strong> */}
                    <strong>{Moment(change.created_at).format('MMMM Do YYYY, h:mm:ss a')}</strong>
                  </div>
                  <ChangeDetails change={change} predicates={predicates} />
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
  };

  return (
    <Collapsible
      cardStyle={"mb-3 alert-info"}
      cardHeaderStyle={"borderless"}
      bodyContent={<ChangelogStruct />}
      headerContent={<h4>Changelog</h4>}
    />
  );
};

export default MappingChangeLog;
