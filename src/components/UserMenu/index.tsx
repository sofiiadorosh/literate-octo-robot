import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as Cart } from '@assets/cart.svg';
import { ReactComponent as Heart } from '@assets/heart.svg';
import { ReactComponent as User } from '@assets/user.svg';
import { useAppSelector } from '@hooks';
import { useAuth } from '@hooks';
import { selectCart } from '@store/cart/selectors';
import { selectWishlistIds } from '@store/wishlist/selectors';

import './UserMenu.scss';

export const UserMenu: FC = () => {
  const cart = useAppSelector(selectCart);
  const wishlist = useAppSelector(selectWishlistIds);
  const { user } = useAuth();
  const products = wishlist.find(({ id: userId }) => userId === user?.id);

  return (
    <ul className="user-list">
      <li className="user-list__item">
        <NavLink to="/wishlist" className="user-list__link">
          <Heart className="user-list__icon" />
        </NavLink>
        {Boolean(products?.products.length) && (
          <span className="cart">{products?.products.length}</span>
        )}
      </li>
      <li className="user-list__item">
        <NavLink to="/profile" className="user-list__link">
          <User className="user-list__icon" />
        </NavLink>
      </li>
      <li className="user-list__item">
        <NavLink to="/checkout" className="user-list__link">
          <Cart className="user-list__icon" />
        </NavLink>
        {Boolean(cart.length) && <span className="cart">{cart.length}</span>}
      </li>
    </ul>
  );
};
