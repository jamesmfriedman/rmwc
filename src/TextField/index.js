// @flow
import * as React from 'react';
import classNames from 'classnames';
import { MDCTextField } from '@material/textfield/dist/mdc.textfield';
import { noop } from '../Base/noop';
import { simpleTag, withMDC } from '../Base';
import { Icon } from '../Icon';

import type { SimpleTagPropsT } from '../Base';

type TextFieldRootPropsT = {
  /** Makes a multiline TextField. */
  textarea?: boolean,
  /** Makes the TextField fullwidth. */
  fullwidth?: boolean,
  /** Makes the TextField have a visiual box. */
  box?: boolean
} & SimpleTagPropsT;

export const TextFieldRoot: React.ComponentType<
  TextFieldRootPropsT
> = simpleTag({
  displayName: 'TextFieldRoot',
  classNames: props => [
    'mdc-text-field',
    {
      'mdc-text-field--textarea': props.textarea,
      'mdc-text-field--fullwidth': props.fullwidth,
      'mdc-text-field--box': props.box
    }
  ],
  consumeProps: ['textarea', 'box', 'fullwidth']
});

export const TextFieldLabel = simpleTag({
  displayName: 'TextFieldLabel',
  tag: 'label',
  classNames: props => [
    'mdc-text-field__label',
    {
      'mdc-text-field__label--float-above': props.value
    }
  ],
  consumeProps: ['value']
});

export const TextFieldInput = simpleTag({
  displayName: 'TextFieldInput',
  tag: 'input',
  classNames: 'mdc-text-field__input',
  defaultProps: {
    type: 'text'
  }
});

export const TextFieldTextarea = simpleTag({
  displayName: 'TextFieldTextarea',
  tag: 'textarea',
  classNames: 'mdc-text-field__input'
});

export const TextFieldBottomLine = simpleTag({
  displayName: 'TextFieldBottomLine',
  classNames: 'mdc-text-field__bottom-line'
});

type TextFieldHelperTextPropsT = {
  /** Make the help text always visible */
  persistent?: boolean,
  /** Make the help a validation message style */
  validationMsg?: boolean
};

/**
 * A help text component
 */
export class TextFieldHelperText extends simpleTag({
  displayName: 'TextFieldHelperText',
  tag: 'p',
  classNames: props => [
    'mdc-text-field-helper-text',
    {
      'mdc-text-field-helper-text--persistent': props.persistent,
      'mdc-text-field-helper-text--validation-msg': props.validationMsg
    }
  ],
  consumeProps: ['persistent', 'validationMsg']
})<TextFieldHelperTextPropsT> {
  render() {
    return super.render();
  }
}

/**
 * An Icon in a TextField
 */
type TextFieldIconPropsT = {
  /** The icon to use */
  use: React.Node
};

export const TextFieldIcon = (props: TextFieldIconPropsT) => (
  <Icon {...props} className={(props.className, 'mdc-text-field__icon')} />
);

type TextFieldPropsT = {
  /** A ref for the native input. */
  inputRef?: React.Ref<any>,
  /** Disables the input. */
  disabled?: boolean,
  /** Sets the Validity state of the input */
  valid?: boolean,
  /** A label for the input. */
  label?: React.Node,
  /** Add a leading icon. */
  withLeadingIcon?: React.Node,
  /** Add a trailing icon. */
  withTrailingIcon?: React.Node,
  /** By default, props spread to the input. These props are for the component's root container. */
  rootProps?: Object
} & TextFieldRootPropsT &
  SimpleTagPropsT;

export const TextField = withMDC({
  mdcConstructor: MDCTextField,
  mdcElementRef: true,
  defaultProps: {
    inputRef: noop,
    disabled: false,
    valid: undefined,
    box: undefined,
    fullwidth: undefined,
    label: undefined,
    textarea: undefined
  },
  onUpdate: (props, nextProps, api, inst) => {
    if (props && props.textarea !== nextProps.textarea) {
      inst.mdcComponentReinit();
    }
  }
})(
  class extends React.Component<TextFieldPropsT> {
    static displayName = 'TextField';
    render() {
      const {
        label = '',
        className,
        inputRef,
        box,
        fullwidth,
        withLeadingIcon,
        withTrailingIcon,
        mdcElementRef,
        children,
        textarea,
        rootProps = {},
        ...rest
      } = this.props;

      const tagProps = {
        ...rest,
        elementRef: inputRef,
        id: rest.id || Date.now() + Math.random() + ''
      };

      const tag = textarea ? (
        <TextFieldTextarea {...tagProps} />
      ) : (
        <TextFieldInput {...tagProps} />
      );

      return (
        <TextFieldRoot
          {...rootProps}
          className={classNames(className, rootProps.className, {
            'mdc-text-field--with-leading-icon': !!withLeadingIcon,
            'mdc-text-field--with-trailing-icon': !!withTrailingIcon
          })}
          textarea={textarea}
          box={box}
          fullwidth={fullwidth}
          elementRef={mdcElementRef}
        >
          {withLeadingIcon}
          {children}
          {tag}

          {!!label && (
            <TextFieldLabel htmlFor={tagProps.id} value={tagProps.value}>
              {label}
            </TextFieldLabel>
          )}

          {withTrailingIcon}
          <TextFieldBottomLine />
        </TextFieldRoot>
      );
    }
  }
);

export default TextField;
