import * as RMWC from '@rmwc/types';
import React from 'react';
import { MDCSelectFoundation } from '@material/select';
import { useClassNames, useId, Tag, createComponent } from '@rmwc/base';
import { FloatingLabel } from '@rmwc/floating-label';
import { LineRipple } from '@rmwc/line-ripple';

import { NotchedOutline } from '@rmwc/notched-outline';
import {
  Menu,
  MenuItem,
  MenuItems,
  MenuProps,
  MenuApi,
  MenuOnSelectEventT
} from '@rmwc/menu';
import { ListGroup, ListGroupSubheader, ListDivider } from '@rmwc/list';
import { withRipple } from '@rmwc/ripple';

import { useSelectFoundation } from './foundation';
import { SelectIcon } from '../select-icon';

export interface FormattedOption
  extends Omit<React.AllHTMLAttributes<any>, 'label'> {
  label: React.ReactNode;
  value?: string;
  options?: FormattedOption[];
}

/** A Select Component */
export interface SelectProps {
  /** The value for a controlled select. */
  value?: string;
  /** Adds help text to the field */
  helpText?: React.ReactNode | SelectHelperTextProps;
  /** Options accepts flat arrays, value => label maps, and more. See examples for details. */
  options?: FormattedOption[] | string[] | { [value: string]: string };
  /** A label for the form control. */
  label?: string;
  /** Placeholder text for the form control. Set to a blank string to create a non-floating placeholder label. */
  placeholder?: string;
  /** Makes the select outlined. */
  outlined?: boolean;
  /** Makes the Select visually invalid. This is sometimes automatically my material-components-web.  */
  invalid?: boolean;
  /** Makes the Select disabled.  */
  disabled?: boolean;
  /** Makes the Select required.  */
  required?: boolean;
  /** Renders a non native / enhanced dropdown */
  enhanced?: boolean | (MenuProps & { ref?: React.Ref<HTMLElement> });
  /** Props for the root element. By default, additional props spread to the native select element.  */
  rootProps?: Object;
  /** A reference to the native select element. Not applicable when `enhanced` is true. */
  inputRef?: (ref: HTMLSelectElement | null) => void;
  /** Add a leading icon. */
  icon?: RMWC.IconPropT;
  /** Advanced: A reference to the MDCFoundation. */
  foundationRef?: React.Ref<MDCSelectFoundation>;
}

export type SelectHTMLProps = RMWC.HTMLProps<
  HTMLSelectElement,
  Omit<React.AllHTMLAttributes<HTMLSelectElement>, 'onSelect'>
>;

/**
 * Takes multiple structures for options and returns [{label: 'label', value: 'value', ...rest}]
 */
const createSelectOptions = (options: any): FormattedOption[] => {
  // preformatted array
  if (Array.isArray(options) && options[0] && typeof options[0] === 'object') {
    return options.map((opt) => {
      if (typeof opt !== 'object') {
        throw new Error(`Encountered non object for Select ${opt}`);
      }
      return { ...opt, options: createSelectOptions(opt.options) };
    });
  }

  // simple array
  if (Array.isArray(options)) {
    return options.map((value) => ({ value, label: value }));
  }

  // value => label objects
  if (typeof options === 'object') {
    return Object.keys(options).map((value) => ({
      value,
      label: options[value]
    }));
  }

  // default, just return
  return options;
};

const SelectDropdownArrow = React.memo(function SelectDropdownArrow() {
  return <i className="mdc-select__dropdown-icon" />;
});

function NativeMenu(
  props: {
    selectOptions: any;
    placeholder?: string;
    children: React.ReactNode;
    elementRef: React.Ref<HTMLSelectElement>;
    value: any;
    defaultValue?: any;
  } & React.HTMLProps<HTMLSelectElement>
) {
  const {
    selectOptions,
    placeholder = '',
    children,
    elementRef,
    ...rest
  } = props;

  const renderOption = ({
    label,
    option,
    index
  }: {
    label: React.ReactNode;
    option: FormattedOption;
    index: number;
  }) => {
    return (
      <option key={index} {...(option as any)} value={option.value}>
        {label}
      </option>
    );
  };

  const isEmptyValue = !props.value && !props.defaultValue;

  return (
    <select
      tabIndex={0}
      {...rest}
      ref={elementRef}
      className={`rmwc-select__native-control ${rest.className || ''}`}
    >
      {(props.placeholder !== undefined || isEmptyValue) && (
        <option value="" disabled={isEmptyValue}>
          {placeholder}
        </option>
      )}
      {!!selectOptions &&
        selectOptions.map(
          ({ label, options, ...option }: FormattedOption, index: number) => {
            if (options) {
              return (
                <optgroup label={label as string} key={index}>
                  {options.map(({ label, ...option }, index) =>
                    renderOption({
                      label,
                      option: option as FormattedOption,
                      index
                    })
                  )}
                </optgroup>
              );
            }

            return renderOption({
              label,
              option: option as FormattedOption,
              index
            });
          }
        )}
      {children}
    </select>
  );
}

const SelectedTextEl = withRipple({ surface: false })(function (props: any) {
  return <Tag {...props} />;
});

interface EnhancedMenuProps extends MenuProps {
  selectOptions: FormattedOption[];
  placeholder?: string;
  selectedIndex?: number;
  menuApiRef: (api: MenuApi) => void;
  value?: string;
  defaultValue?: any;
  children?: React.ReactNode;
}

const EnhancedMenu = React.forwardRef((props: EnhancedMenuProps & SelectHTMLProps, ref: React.Ref<HTMLElement>) => {
  const {
    selectOptions,
    menuApiRef,
    value,
    placeholder,
    children,
    selectedIndex,
    ...rest
  } = props;

  let currentIndex = 0;

  const renderOption = ({
    label,
    option
  }: {
    label: React.ReactNode;
    option: FormattedOption;
  }) => {
    currentIndex += 1;

    return (
      <MenuItem
        key={`${label}-${option.value}`}
        activated={
          value !== undefined
            ? option.value === value
            : currentIndex - 1 === selectedIndex
        }
        {...option}
        data-value={option.value}
      >
        {label}
      </MenuItem>
    );
  };

  return (
    <Menu
      {...rest}
      ref={ref}
      apiRef={menuApiRef}
      className="mdc-select__menu"
      focusOnOpen
    >
      {!!props.placeholder && (
        <MenuItem
          selected={currentIndex - 1 === selectedIndex}
          data-value=""
          theme="textDisabledOnBackground"
        >
          {placeholder}
        </MenuItem>
      )}

      {selectOptions.map(
        ({ label, options, ...option }: FormattedOption, i: number) => {
          if (options) {
            return (
              <ListGroup key={i}>
                {label && (
                  <ListGroupSubheader theme="textDisabledOnBackground">
                    {label}
                  </ListGroupSubheader>
                )}
                <MenuItems>
                  {options.map(({ label, ...option }) =>
                    renderOption({ label, option: option as FormattedOption })
                  )}
                </MenuItems>
                {i < selectOptions.length - 1 && <ListDivider />}
              </ListGroup>
            );
          }

          return renderOption({ label, option: option as FormattedOption });
        }
      )}
      {children}
    </Menu>
  );
}

export const Select: RMWC.ComponentType<
  SelectProps,
  SelectHTMLProps,
  'select'
> = createComponent<SelectProps, SelectHTMLProps>(function Select(props, ref) {
  const {
    placeholder,
    children,
    value,
    outlined,
    label = '',
    options = [],
    rootProps = {},
    enhanced,
    icon,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    invalid,
    inputRef,
    helpText,
    foundationRef,
    ...rest
  } = props;

  const selectOptions = createSelectOptions(options);
  const {
    rootEl,
    selectedTextEl,
    notchWidth,
    menuOpen,
    selectedTextContent,
    lineRippleActive,
    lineRippleCenter,
    floatLabel,
    setFloatingLabel,
    setNativeControl,
    setLeadingIcon,
    selectedIndex,
    setMenu,
    handleFocus,
    handleBlur,
    handleClick,
    handleKeydown,
    handleMenuClosed,
    handleMenuOpened,
    handleMenuSelected
  } = useSelectFoundation(props);

  const id = useId('select', props);

  const className = useClassNames(props, [
    'mdc-select',
    {
      'mdc-select--outlined': !!outlined,
      'mdc-select--required': !!props.required,
      'mdc-select--invalid': !!invalid,
      'mdc-select--with-leading-icon': !!icon,
      'mdc-select--no-label': !label
    }
  ]);

  const enhancedMenuProps = typeof enhanced === 'object' ? enhanced : {};

  const defaultValue =
    value !== undefined ? undefined : props.defaultValue || '';

  const renderedLabel = (
    <FloatingLabel float={floatLabel} apiRef={setFloatingLabel} htmlFor={id}>
      {label}
    </FloatingLabel>
  );

  const renderHelpText = () => {
    const shouldRender = !!helpText;

    if (!shouldRender) {
      return null;
    }

    const shouldSpread =
      typeof helpText === 'object' && !React.isValidElement(helpText);

    return helpText && shouldSpread ? (
      <SelectHelperText {...(helpText as any)} />
    ) : (
      <SelectHelperText>{helpText}</SelectHelperText>
    );
  };

  return (
    <>
      <Tag
        role="listbox"
        {...rootProps}
        element={rootEl}
        ref={ref}
        className={className}
      >
        <div className="mdc-select__anchor">
          {!!icon && <SelectIcon apiRef={setLeadingIcon} icon={icon} />}
          <SelectDropdownArrow />
          <SelectedTextEl
            className="mdc-select__selected-text"
            role="button"
            aria-haspopup="listbox"
            element={selectedTextEl}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleClick}
            onKeyDown={handleKeydown}
            /** In the case of native selects, we don't want this to be be focusable */
            tabIndex={enhanced ? undefined : -1}
          >
            {selectedTextContent || <>&nbsp;</>}
          </SelectedTextEl>
          {outlined ? (
            <NotchedOutline notch={notchWidth}>{renderedLabel}</NotchedOutline>
          ) : (
            <>
              {renderedLabel}
              <LineRipple active={lineRippleActive} center={lineRippleCenter} />
            </>
          )}
          {!enhanced && (
            <NativeMenu
              {...rest}
              value={value}
              children={children}
              defaultValue={defaultValue}
              placeholder={placeholder}
              selectOptions={selectOptions}
              elementRef={setNativeControl}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(evt: React.ChangeEvent<HTMLSelectElement>) =>
                handleMenuSelected(evt.currentTarget.selectedIndex)
              }
            />
          )}
        </div>

        {enhanced && (
          <EnhancedMenu
            {...rest}
            {...enhancedMenuProps}
            anchorCorner="bottomStart"
            defaultValue={defaultValue}
            placeholder={placeholder}
            open={menuOpen}
            onClose={handleMenuClosed}
            onOpen={handleMenuOpened}
            onSelect={(evt: MenuOnSelectEventT) => {
              handleMenuSelected(evt.detail.index);
            }}
            selectOptions={selectOptions}
            value={value}
            selectedIndex={selectedIndex}
            menuApiRef={setMenu}
            children={children}
          />
        )}
      </Tag>
      {renderHelpText()}
    </>
  );
});

/** A help text component */
export interface SelectHelperTextProps {
  /** Make the help text always visible */
  persistent?: boolean;
  /** Make the help a validation message style */
  validationMsg?: boolean;
}

/** A help text component */
export const SelectHelperText: RMWC.ComponentType<
  SelectHelperTextProps,
  RMWC.HTMLProps,
  'div'
> = createComponent<SelectHelperTextProps>(function SelectHelperText(
  props: SelectHelperTextProps & RMWC.HTMLProps,
  ref: React.Ref<any>
) {
  const { persistent, validationMsg, ...rest } = props;
  const className = useClassNames(props, [
    'mdc-select-helper-text',
    {
      'mdc-select-helper-text--persistent': persistent,
      'mdc-select-helper-text--validation-msg': validationMsg
    }
  ]);

  return <Tag tag="p" {...rest} className={className} ref={ref} />;
});
