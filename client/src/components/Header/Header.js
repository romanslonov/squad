import React, { Component } from 'react';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
  <header class={style.header}>
    <h1>Preact App</h1>
    <nav>
      <Link activeClassName={style.active} href="/">
        Home
      </Link>
      <Link activeClassName={style.active} href="/profile">
        Me
      </Link>
      <Link activeClassName={style.active} href="/profile/john">
        John
      </Link>
      <Link activeClassName={style.active} href="/login">
        Sign In
      </Link>
      <Link activeClassName={style.active} href="/registration">
        Registration
      </Link>
    </nav>
  </header>
);

export default Header;