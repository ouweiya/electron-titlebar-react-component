import React, { useRef } from 'react';
import styles from './TitlebarWid.module.css';
import clsx from 'clsx';

const Titlebar = ({ className, ...other }) => {
  const maximize = useRef();

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

  return (
    <div className={clsx(styles['window-controls-container'], className)} {...other}>
      <div className={clsx(styles['window-icon-bg'])} onClick={window.remote ? handlerMin : null}>
        <div className={clsx(styles['window-icon'], styles['window-minimize'])} />
      </div>

      <div className={clsx(styles['window-icon-bg'])} onClick={window.remote ? handlerMax : null}>
        <div className={clsx(styles['window-icon'], styles['window-maximize'])} ref={maximize} />
      </div>

      <div
        className={clsx(styles['window-icon-bg'], styles['window-close-bg'])}
        onClick={window.remote ? handlerClose : null}
      >
        <div className={clsx(styles['window-icon'], styles['window-close'])} />
      </div>
    </div>
  );
};

export default Titlebar;
