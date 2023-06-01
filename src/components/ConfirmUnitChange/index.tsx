import React, { FC } from 'react';

import './ConfirmUnitChange.scss';

type ConfirmUnitChangeProps = {
  unit: string;
  setUnit: () => void;
  closeModal: () => void;
};

export const ConfirmUnitChange: FC<ConfirmUnitChangeProps> = ({
  unit,
  setUnit,
  closeModal,
}) => {
  const setUnitHandler = () => {
    setUnit();
    closeModal();
  };
  return (
    <div className="change-unit">
      <p className="change-unit__question">
        You already have a product of the same unit type in your cart. Are you
        certain you want to change the unit to {unit}? If you proceed, only one
        product will remain, with the total quantity being updated accordingly.
      </p>
      <div className="change-unit__button-wrapper">
        <button
          type="button"
          className="change-unit__button_primary"
          onClick={setUnitHandler}
        >
          Change unit
        </button>
        <button
          type="button"
          className="change-unit__button_secondary"
          onClick={() => closeModal()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
