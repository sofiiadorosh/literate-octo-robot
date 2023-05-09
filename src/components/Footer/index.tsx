import React from 'react';

import { Container } from '@components/Container';
import { FooterLinks } from '@components/FooterLinks';
import { Tags } from '@components/Tags';
import { Copyright } from '@components/Copyright';

import './Footer.scss';

const touchItems = [
  { href: '/about', text: 'About Us' },
  { href: '/career', text: 'Careers' },
  { href: '/purchase-protection', text: 'Press Releases' },
  { href: '/blog', text: 'Blog' },
];

const connectionItems = [
  { href: '/facebook', text: 'Facebook' },
  { href: '/twitter', text: 'Twitter' },
  { href: '/instagram', text: 'Instagram' },
  { href: '/youtube', text: 'Youtube' },
  { href: '/linkedin', text: 'LinkedIn' },
];

const earningItems = [
  { href: '/affiliate', text: 'Become an Affiliate' },
  { href: '/advertise', text: 'Advertise your product' },
  { href: '/market', text: 'Sell on Market' },
];

const accountItems = [
  { href: '/account', text: 'Your account' },
  { href: '/return-centre', text: 'Returns Centre' },
  { href: '/purchase-protection', text: '100 % purchase protection' },
  { href: '/chat', text: 'Chat with us' },
  { href: '/help', text: 'Help' },
];

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__navigation">
          <FooterLinks title="Get in touch" array={touchItems} />
          <FooterLinks title="Connections" array={connectionItems} />
          <FooterLinks title="Earnings" array={earningItems} />
          <FooterLinks title="Account" array={accountItems} />
        </div>
        <Tags />
        <Copyright />
      </Container>
    </footer>
  );
};
