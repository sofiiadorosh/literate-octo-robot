import React, { FC, useEffect } from 'react';

import { CheckoutForm } from '@components/CheckoutForm';
import { CompletedOrder } from '@components/CompletedOrder';
import { Container } from '@components/Container';
import { Modal } from '@components/Modal';
import { Order } from '@components/Order';
import { useAppSelector, useAppDispatch, useAuth } from '@hooks';
import { getProductsByIds } from '@store/cart/operations';
import { selectCart, selectIsFormSubmitted } from '@store/cart/selectors';
import { setFormSubmitted } from '@store/cart/slice';

import './CheckoutPage.scss';

const CheckoutPage: FC = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const isFormSubmitted = useAppSelector(selectIsFormSubmitted);
  const { user } = useAuth();
  const items = cart.filter(item => item.userId === user?.id);

  useEffect(() => {
    const ids = items.map(item => item.id);
    dispatch(getProductsByIds(ids));
  }, [cart, dispatch]);

  useEffect(() => {
    const bodyEl = document.getElementById('body') as HTMLElement;

    bodyEl.style.overflow = isFormSubmitted ? 'hidden' : 'visible';
  }, [isFormSubmitted]);

  const closeModalHandler = () => {
    dispatch(setFormSubmitted(false));
  };

  return (
    <section className="checkout">
      <Container>
        <div className="checkout__layout">
          <CheckoutForm />
          <Order />
        </div>
        {isFormSubmitted && (
          <Modal closeModal={closeModalHandler}>
            <CompletedOrder />
          </Modal>
        )}
      </Container>
    </section>
  );
};

export default CheckoutPage;
