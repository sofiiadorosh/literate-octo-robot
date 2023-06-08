import React, { FC } from 'react';

import defaultPofile from '@assets/default.png';
import { Container } from '@components/Container';
import { LoginForm } from '@components/LoginForm';
import { useAuth } from '@hooks';
import { useAppDispatch } from '@hooks';
import { googleSignOut } from '@store/auth/operations';
import { clearData } from '@store/cart/slice';

import './ProfilePage.scss';

const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthorized, user } = useAuth();

  if (!isAuthorized) {
    return (
      <section>
        <Container>
          <LoginForm />
        </Container>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  const { name, email, picture } = user;
  const [firstName, lastName] = name?.split(' ') ?? ['', ''];

  const googleSignOutHandler = async () => {
    await dispatch(googleSignOut());
    dispatch(clearData());
  };

  return (
    <section className="profile">
      <Container>
        <div className="profile__content">
          <div className="profile__picture">
            <img
              src={picture ? picture : defaultPofile}
              alt={name ? name : 'User image'}
            />
          </div>
          <ul className="profile__list">
            <li className="profile__item">
              <span className="profile__item_accent">First Name</span>
              <span>{firstName}</span>
            </li>
            <li className="profile__item">
              <span className="profile__item_accent">Last name</span>
              <span>{lastName}</span>
            </li>
            <li className="profile__item">
              <span className="profile__item_accent">E-mail</span>
              <span>{email}</span>
            </li>
          </ul>
          <button
            type="button"
            className="profile__button"
            onClick={googleSignOutHandler}
          >
            Log out
          </button>
        </div>
      </Container>
    </section>
  );
};

export default ProfilePage;
