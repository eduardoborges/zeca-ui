import React from 'react';

import s from './button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export function Button(props: ButtonProps) {
  const { type = 'button', ...rest } = props;
  return (
    <button className={s.container} type={type || 'button'} {...rest}>
      Button
    </button>
  );
}
