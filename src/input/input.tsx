import React from 'react';

import s from './input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  const { type = 'text', ...rest } = props;
  return (
    <input className={s.container} type={type || 'text'} {...rest} />
  );
}
