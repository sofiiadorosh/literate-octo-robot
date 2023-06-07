import React, { FC, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Arrow } from '@assets/arrow.svg';
import { ReactComponent as Heart } from '@assets/heart.svg';
import { LoginForm } from '@components/LoginForm';
import { Modal } from '@components/Modal';
import { Stars } from '@components/Stars';
import { useAppDispatch, useAppSelector, useAuth } from '@hooks';
import { selectWishlistIds } from '@store/wishlist/selectors';
import { setWishlist } from '@store/wishlist/slice';
import { Product, ButtonWishText } from '@types';
import { getNewPrice } from '@utils';

import './ProductItem.scss';

type ProductItemProps = {
  item: Product;
};

export const ProductItem: FC<ProductItemProps> = ({
  item: {
    id,
    previewImage,
    title,
    overview,
    rating,
    fresheness,
    farm,
    deliveryArea,
    stock,
    discount,
    price,
    shipping,
    deliveryTime,
  },
}) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectWishlistIds);
  const { isAuthorized, user } = useAuth();

  const [buttonName, setButtonName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isProductInWishlist = items.find(
    ({ id: userId, products }) => userId === user?.id && products.includes(id)
  );

  const updateWishlistHandler = () => {
    if (!isAuthorized) {
      return setIsModalOpen(true);
    }
    if (user && user.id) {
      dispatch(setWishlist({ userId: user?.id, productId: id }));
    }
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const bodyEl = document.getElementById('body') as HTMLElement;

    bodyEl.style.overflow = isModalOpen ? 'hidden' : 'visible';
  }, [isModalOpen]);

  const getButtonText = () =>
    isProductInWishlist ? ButtonWishText.REMOVE : ButtonWishText.ADD;

  useEffect(() => {
    const name = getButtonText();
    setButtonName(name);
  }, [isProductInWishlist]);

  return (
    <li className="product">
      <NavLink to={id} className="product__thumb">
        <img src={previewImage} alt={title} className="product__image" />
      </NavLink>
      <div className="product__content">
        <div className="product-info">
          <div className="product-info__main">
            <h2 className="product-info__title">
              <NavLink to={id} className="product__link">
                {title}
              </NavLink>
            </h2>
            <p className="product-info__description">
              {overview.substring(0, 50)}...
            </p>
            <Stars rating={rating} />
          </div>
          <ul className="product-info__list">
            <li className="product-info__item">
              <span>Fresheness</span>
              <span className="product-infoname product-infoname_accent">
                {fresheness}
              </span>
            </li>
            <li className="product-info__item">
              <span>Farm</span>
              <span className="product-info__name">{farm}</span>
            </li>
            <li className="product-info__item">
              <span>Delivery</span>
              <span>{deliveryArea}</span>
            </li>
            <li className="product-info__item">
              <span>Stock</span>
              <span className="product-infoname product-infoname_accent">
                {stock}
              </span>
            </li>
          </ul>
        </div>
        <div className="product-order">
          <div className="product-order__price">
            <span className="product-order__price_price_old">
              {getNewPrice(price.pcs, discount)} USD
            </span>
            <span className="product-order__price_price_new">{price.pcs}</span>
          </div>
          <div className="product-order__info">
            <span className="product-order__shipping">{shipping} Shipping</span>
            <span className="product-order__delivery">
              Delivery in {deliveryTime} days
            </span>
          </div>
          <div className="product-order__button">
            <NavLink to={id} className="product-order__wish-button">
              <span>Product Detail</span>
              <Arrow className="product-order__wish-icon" />
            </NavLink>
            <button
              type="button"
              className="product-order__add-button"
              onClick={updateWishlistHandler}
            >
              <Heart
                className={
                  isProductInWishlist
                    ? 'product-order__add-icon product-order__add-icon_active'
                    : 'product-order__add-icon'
                }
              />
              <span>{buttonName}</span>
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal closeModal={closeModalHandler}>
          <LoginForm closeModal={closeModalHandler} />
        </Modal>
      )}
    </li>
  );
};
