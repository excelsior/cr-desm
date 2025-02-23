import React from "react";

/**
 * @description Renders an Alert box with a title and a message
 *
 * Props:
 * @param {String} cssClass The class that will determine the color of the box. By default it's
 *   "alert-danger", which will render a red box.
 * @param {String} title The first and bolded word to remark. By default it's "Attention".
 * @param {String|Array} message The message to show in the box. It can be both a string message
 *   or an array of strings representing the multiple error messages
 */
const AlertNotice = (props) => {
  /**
   * Elements from props
   */
  const { cssClass, title, message, onClose } = props;

  return (
    <div
      className={
        "alert alert-dismissible " + (cssClass ? cssClass : "alert-danger")
      }
    >
      <h4>
        <strong>{title ? title : "Attention!"}</strong>
      </h4>
      {_.isArray(message) ? (
        message.map((msg, i) => {
          return (
            <ul key={i}>
              <li>{msg}</li>
            </ul>
          );
        })
      ) : (
        <p>{message}</p>
      )}
      <button
        type="button"
        className="close"
        data-dismiss={!onClose && "alert"}
        aria-label="Close"
        onClick={onClose}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default AlertNotice;
