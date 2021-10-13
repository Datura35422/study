import React from 'react';
import classNames from 'classnames';

export enum ButtonSize {
  Large = 'large',
  Small = 'small',
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link',
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  href?: string;
  children: React.ReactNode;
}
// 联合类型
// button 类型
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
// a 链接类型
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
// Partial 可以将类型中的属性都变为可选的
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = props => {
  const {
    className,
    btnType,
    disabled,
    size,
    href,
    children,
    ...restProps // 剩余参数 属性
  } = props

  // btn btn-lg btn-primary
  // disabled 链接类型的按钮没有disabled属性
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled
  })
  if (btnType === ButtonType.Link && href) {
    return (
      <a
        className={ classes }
        href={ href }
        { ...restProps }
      >
        { children }
      </a>
    )
  } else {
    return (
      <button
        className={ classes }
        disabled={ disabled }
        { ...restProps }
      >
        { children }
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Primary,
  size: ButtonSize.Large
}

export default Button;