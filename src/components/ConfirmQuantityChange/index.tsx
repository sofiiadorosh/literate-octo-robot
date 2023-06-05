import React, { FC } from 'react';

type ConfirmQuantityChangeProps = {
  addToCart: () => void;
  closeModal: () => void;
};

export const ConfirmQuantityChange: FC<ConfirmQuantityChangeProps> = ({
  addToCart,
  closeModal,
}) => {
  const addToCartHandler = () => {
    addToCart();
    closeModal();
  };
  return (
    <div className="change-unit">
      <p className="change-unit__question">
        You currently have a product of the same type in your cart. Are you sure
        you want to add more? If you proceed, the total quantity will be updated
        accordingly.
      </p>
      <div className="change-unit__button-wrapper">
        <button
          type="button"
          className="change-unit__button_primary"
          onClick={addToCartHandler}
        >
          Add to cart
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
