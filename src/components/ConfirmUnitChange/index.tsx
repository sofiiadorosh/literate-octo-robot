import React, { FC } from 'react';

import './ConfirmUnitChange.scss';

type ConfirmUnitChangeProps = {
  unit: string;
  stock: number;
  prevQuantity: number | undefined;
  currentQuantity: number;
  setUnit: () => void;
  closeModal: () => void;
};

export const ConfirmUnitChange: FC<ConfirmUnitChangeProps> = ({
  unit,
  stock,
  prevQuantity,
  currentQuantity,
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
        You currently have a product of the same unit type in your cart with a
        quantity of&nbsp;
        <span className="change-unit__question_green">{prevQuantity}</span>. Are
        you sure you want to change the unit to a&nbsp;
        <span className="change-unit__question_green">{unit}</span>? If you
        proceed, the total quantity will be updated accordingly, resulting in a
        total of&nbsp;
        {prevQuantity && prevQuantity + currentQuantity > stock ? (
          <>
            <span className="change-unit__question_red">{stock}</span> because
            it exceeds the maximum stock limit.
          </>
        ) : (
          <>
            <span className="change-unit__question_green">
              {prevQuantity && prevQuantity + currentQuantity}
            </span>
            &nbsp; products in your cart ({prevQuantity} + {currentQuantity}).
          </>
        )}
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
