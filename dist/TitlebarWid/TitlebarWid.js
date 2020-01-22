function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef } from 'react';
import styles from './TitlebarWid.module.css';
import clsx from 'clsx';

const Titlebar = ({
  className,
  ...other
}) => {
  const maximize = useRef(); // Only execute "remote.getCurrentWindow" in Electron environment

  let wind = null;

  if (window.remote) {
    wind = window.remote.getCurrentWindow();
  }

  const handlerMin = () => wind.minimize();

  const handlerMax = () => {
    if (!wind.isMaximized()) {
      wind.maximize();
      maximize.current.classList.add(styles['window-unmaximize']);
      maximize.current.classList.remove(styles['window-maximize']);
    } else {
      wind.unmaximize();
      maximize.current.classList.add(styles['window-maximize']);
      maximize.current.classList.remove(styles['window-unmaximize']);
    }
  };

  const handlerClose = () => wind.close();

  return React.createElement("div", _extends({
    className: clsx(styles['window-controls-container'], className)
  }, other), React.createElement("div", {
    className: clsx(styles['window-icon-bg']),
    onClick: handlerMin
  }, React.createElement("div", {
    className: clsx(styles['window-icon'], styles['window-minimize'])
  })), React.createElement("div", {
    className: clsx(styles['window-icon-bg']),
    onClick: handlerMax
  }, React.createElement("div", {
    className: clsx(styles['window-icon'], styles['window-maximize']),
    ref: maximize
  })), React.createElement("div", {
    className: clsx(styles['window-icon-bg'], styles['window-close-bg']),
    onClick: handlerClose
  }, React.createElement("div", {
    className: clsx(styles['window-icon'], styles['window-close'])
  })));
};

export default Titlebar;