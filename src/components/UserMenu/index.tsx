import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Cart } from '@assets/cart.svg';
import { ReactComponent as Heart } from '@assets/heart.svg';
import { ReactComponent as User } from '@assets/user.svg';
import { useAppSelector, useAuth } from '@hooks';
import { selectCart } from '@store/cart/selectors';
import { selectWishlistIds } from '@store/wishlist/selectors';
import { Pathname } from '@types';

import './UserMenu.scss';

export const UserMenu: FC = () => {
  const cart = useAppSelector(selectCart);
  const wishlist = useAppSelector(selectWishlistIds);
  const { user } = useAuth();
  const wishlistItems = wishlist.find(({ id: userId }) => userId === user?.id);
  const cartItems = cart.filter(item => item.userId === user?.id);

  return (
    <ul className="user-list">
      <li className="user-list__item">
        <NavLink to={Pathname.WISHLIST} className="user-list__link">
          <Heart className="user-list__icon" />
        </NavLink>
        {Boolean(wishlistItems?.products.length) && (
          <span className="cart">{wishlistItems?.products.length}</span>
        )}
      </li>
      <li className="user-list__item">
        <NavLink to={Pathname.PROFILE} className="user-list__link">
          <User className="user-list__icon" />
        </NavLink>
      </li>
      <li className="user-list__item">
        <NavLink to={Pathname.CHECKOUT} className="user-list__link">
          <Cart className="user-list__icon" />
        </NavLink>
        {Boolean(cartItems.length) && (
          <span className="cart">{cartItems.length}</span>
        )}
      </li>
    </ul>
  );
};
