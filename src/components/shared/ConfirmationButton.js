import React from 'react';
import T from 'prop-types';

function ConfirmationButton({ confirmation, onConfirm, ...props }) {
  const [confirmationVisible, setConfirmationVisible] = React.useState(false);

  const showConfirmation = () => setConfirmationVisible(true);
  const hideConfirmation = () => setConfirmationVisible(false);

  const handleClick = showConfirmation;
  const handleConfirmClick = () => {
    hideConfirmation();
    onConfirm();
  };
  const handleCancelClick = hideConfirmation;

  return (
    <>
      <button onClick={handleClick} {...props} />
      {confirmationVisible && (
        <div>
          {confirmation}
          <button onClick={handleConfirmClick}>Ok</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      )}
    </>
  );
}

ConfirmationButton.propTypes = {
  confirmation: T.node,
  onConfirm: T.func.isRequired,
};

ConfirmationButton.defaultProps = {
  confirmation: null,
};

export default ConfirmationButton;
