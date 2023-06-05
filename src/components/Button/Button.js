import clsx from "clsx";
import styles from './Button.module.scss'
import { Link } from "react-router-dom";

function Button({
    disabled = false,
    black = false,
    yellow = false,
    white = false,
    sm = false,
    md = false,
    lg = false,
    boder = false,
    href,
    to,
    children,
    classBtn,
    iconLeft,
    iconRight,
    onClick,
    ...passProps
}) {
    let Element = 'button';
    const props = {
        onClick,
        ...passProps
    };
    if(href){
        Element = 'a'
        props.href = href
    }else if(to){
        Element = Link
        props.to = to
    }

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    
    return ( 
        <Element
            {...props}
            className={clsx(styles.btn,{
                [classBtn]: classBtn,
                [styles.disabled]: disabled,
                [styles.black]: black,
                [styles.yellow]: yellow,
                [styles.white]: white,
                [styles.sm]: sm,
                [styles.md]: md,
                [styles.lg]: lg,
                [styles.boder]: boder,
            })}
        >
            {iconLeft && <span className={clsx(styles.icon)}>{iconLeft}</span>}
            <span className={clsx(styles.title)}>{children}</span>
            {iconRight && <span className={clsx(styles.icon)}>{iconRight}</span>}
        </Element>    
    );
}

export default Button;