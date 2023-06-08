import { nanoid } from '@reduxjs/toolkit';
import React, { FC, useState, useRef, useEffect } from 'react';

import { ReactComponent as Heart } from '@assets/heart.svg';
import { ReactComponent as Plus } from '@assets/plus.svg';
import { ConfirmQuantityChange } from '@components/ConfirmQuantityChange';
import { CountPicker } from '@components/CountPicker';
import { LoginForm } from '@components/LoginForm';
import { Modal } from '@components/Modal';
import { ProductDescription } from '@components/ProductDescription';
import { Questions } from '@components/Questions';
import { Reviews } from '@components/Reviews';
import { Stars } from '@components/Stars';
import { TabsList } from '@components/TabList';
import { useAppSelector, useAppDispatch, useAuth } from '@hooks';
import { selectCart } from '@store/cart/selectors';
import { addToCart } from '@store/cart/slice';
import { selectProductDetails } from '@store/productDetails/selectors';
import { selectWishlistIds } from '@store/wishlist/selectors';
import { setWishlist } from '@store/wishlist/slice';
import { ButtonNames, Tabs, ButtonWishText } from '@types';
import { getNewPrice, setFixedPrice } from '@utils';

import './AboutProduct.scss';

export const AboutProduct: FC = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(selectProductDetails);
  const cartItems = useAppSelector(selectCart);
  const wishlistItems = useAppSelector(selectWishlistIds);
  const { isAuthorized, user } = useAuth();

  if (!selectedProduct) {
    return null;
  }
  const {
    id,
    images,
    overview,
    title,
    country,
    color,
    stock,
    sizes,
    units,
    category,
    rating,
    shipping,
    deliveryArea,
    deliveryTime,
    discount,
    price,
    reviews,
    questions,
    description: productDescr,
  } = selectedProduct;
  const description = {
    Country: country,
    Size: sizes.join(', '),
    Category: category,
    Units: units.join(', '),
    Stock: stock ? 'In stock' : 'Out of stock',
    Delivery: `in ${deliveryTime} days`,
    Color: color,
    'Delivery area': deliveryArea,
  };
  const maxQuantity = parseInt(stock);
  const tabRef = useRef<HTMLDivElement>(null);
  const itemInCart = cartItems.find(
    item => item.id === id && item.unit === unit && item.userId === user?.id
  );
  const isProductInWishlist = wishlistItems.find(
    ({ id: userId, products }) => userId === user?.id && products.includes(id)
  );

  const [unit, setUnit] = useState(units[0]);
  const [count, setCount] = useState(1);
  const [selectedTab, setSelectedTab] = useState(Tabs.DESCRIPTION);
  const [ordered, setOrdered] = useState(0);
  const [remainder, setRemainder] = useState(maxQuantity);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonTextContent, setButtonTextContent] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (tabRef.current) {
      tabRef.current.scrollTo(0, 0);
    }
  }, [selectedTab]);

  useEffect(() => {
    const sameItems = cartItems.filter(
      item => item.id === id && item.unit === unit
    );
    const orderedQuantity = sameItems
      .map(item => item.quantity)
      .reduce((acc, item) => (acc += item), 0);
    setOrdered(orderedQuantity);
    const productRemainder = parseInt(stock) - orderedQuantity;
    setRemainder(productRemainder);
  }, [cartItems, unit, count]);

  useEffect(() => {
    const bodyEl = document.getElementById('body') as HTMLElement;

    bodyEl.style.overflow = isModalOpen ? 'hidden' : 'visible';
  }, [isModalOpen]);

  useEffect(() => {
    const bodyEl = document.getElementById('body') as HTMLElement;

    bodyEl.style.overflow = isSignedIn ? 'hidden' : 'visible';
  }, [isSignedIn]);

  useEffect(() => {
    const textContent = getButtonText();
    setButtonTextContent(textContent);
  }, [isProductInWishlist]);

  const getDescriptionItems = (): JSX.Element[] => {
    const descriptionItems: JSX.Element[] = [];
    Object.entries(description).forEach(([key, value]) => {
      if (key === 'Color' && !value) {
        return;
      }
      descriptionItems.push(
        <li key={key} className="details__item">
          <span className="details__item_color_grey">{key}:</span>
          <span>{value}</span>
        </li>
      );
    });
    return descriptionItems;
  };

  const getTotalPrice = (price: number) => setFixedPrice(price * count);

  const getNewTotalPrice = () => {
    const newPrice = getNewPrice(price[unit], discount);
    return getTotalPrice(newPrice);
  };

  const getButtonText = () =>
    isProductInWishlist ? ButtonWishText.REMOVE : ButtonWishText.ADD;

  const setUnitHandler = (unit: string) => {
    setUnit(unit);
  };

  const setCountHandler = (count: number) => {
    setCount(count);
  };

  const setNextCountHandler = (typeButton: ButtonNames) => {
    if (typeButton === ButtonNames.SUP) {
      setCount(prevState => prevState + 1);
    } else if (typeButton === ButtonNames.SUB) {
      setCount(prevState => prevState - 1);
    }
  };

  const setTab = (tab: Tabs) => {
    setSelectedTab(tab);
  };

  const addToCartHandler = () => {
    if (!isAuthorized) {
      return setIsSignedIn(true);
    }
    if (itemInCart && !isModalOpen) {
      return setIsModalOpen(true);
    }
    const _id = nanoid();
    if (user && user.id) {
      const product = {
        userId: user?.id,
        _id,
        id,
        unit,
        quantity: count,
        stock,
      };
      dispatch(addToCart(product));
    }
    return setCount(1);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
    setIsSignedIn(false);
  };

  const updateWishlistHandler = () => {
    if (!isAuthorized) {
      return setIsSignedIn(true);
    }
    if (user && user.id) {
      dispatch(setWishlist({ userId: user?.id, productId: id }));
    }
  };

  return (
    <div className="details">
      <div className="details__appearance">
        <div className="details__tag-wrapper">
          <span className="details__tag">- {discount}%</span>
          <span className="details__tag">{shipping} shipping</span>
        </div>
        <div className="details__image-wrapper">
          {images.map(image => (
            <div key={image} className="details__thumb">
              <img src={image} alt={title} className="details__image" />
            </div>
          ))}
        </div>
      </div>
      <div className="details__overview">
        <div className="details__info">
          <h1 className="details__name">{title}</h1>
          <div className="details__rating">
            <Stars rating={rating} />
            <span className="details__review">
              ({reviews?.length} customer review)
            </span>
          </div>
        </div>
        <p className="details__description">{overview}</p>
        <ul className="details__list">{getDescriptionItems()}</ul>
        <div>
          <div className="details__price-info">
            <div className="details__price">
              <span>{getNewTotalPrice()} USD</span>
              <span className="details__price_old">
                {getTotalPrice(price[unit])} USD
              </span>
            </div>
            <div className="details__control-wrapper">
              <CountPicker
                items={units}
                max={maxQuantity}
                count={count}
                unit={unit}
                onSetUnit={setUnitHandler}
                onSetCountByValue={setCountHandler}
                onSetCountByStep={setNextCountHandler}
                ordered={ordered}
                remainder={remainder}
                page="product"
              />
              <button
                type="button"
                disabled={!remainder}
                className="details__add-button"
                onClick={addToCartHandler}
              >
                <Plus className="details__add-icon" />
                <span>Add to cart</span>
              </button>
            </div>
            {itemInCart && (
              <span className="details__tag">{`${itemInCart.quantity} ${itemInCart.unit} is in cart now`}</span>
            )}
          </div>
          <button
            type="button"
            className="details__wish-button"
            onClick={updateWishlistHandler}
          >
            <Heart
              className={
                isProductInWishlist
                  ? 'details__wish-icon details__wish-icon_active'
                  : 'details__wish-icon'
              }
            />
            <span>{buttonTextContent}</span>
          </button>
        </div>
        <div className="details__tab">
          <TabsList
            activeTab={selectedTab}
            onSetTab={setTab}
            reviews={reviews}
            questions={questions}
          />
          <div className="details__tab-text" ref={tabRef}>
            {selectedTab === Tabs.DESCRIPTION && (
              <ProductDescription items={productDescr} />
            )}
            {selectedTab === Tabs.REVIEWS && <Reviews items={reviews} />}
            {selectedTab === Tabs.QUESTIONS && <Questions items={questions} />}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal closeModal={closeModalHandler}>
          <ConfirmQuantityChange
            addToCart={addToCartHandler}
            closeModal={closeModalHandler}
          />
        </Modal>
      )}
      {isSignedIn && (
        <Modal closeModal={closeModalHandler}>
          <LoginForm closeModal={closeModalHandler} />
        </Modal>
      )}
    </div>
  );
};
