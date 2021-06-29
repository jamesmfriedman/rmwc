import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { Select } from './';
import { render, act, fireEvent } from '@testing-library/react';

test('renders learn react link', (done) => {
  const onChange = jest.fn();
  const { container } = render(<Select onChange={onChange} />);

  const select = container.children[0].querySelector('select');

  act(() => {
    window.requestAnimationFrame(() => {
      fireEvent.change(select!);
      expect(onChange).toHaveBeenCalled();
      done();
    });
  });
});

describe('Select', () => {
  it('renders', () => {
    mount(
      <Select
        placeholder="Select a food"
        options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
      />
    );
  });

  it('helpText', () => {
    const el = mount(
      <div>
        <Select
          helpText="selectHelpText"
          options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
        />
      </div>
    );

    const el2 = mount(
      <div>
        <Select
          helpText={{
            children: 'selectHelpText',
            validationMsg: true,
            persistent: true
          }}
          options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
        />
      </div>
    );

    expect(el.contains('selectHelpText')).toBe(true);
    expect(el2.contains('selectHelpText')).toBe(true);
    expect(el2.html().includes('mdc-select-helper-text--validation-msg')).toBe(
      true
    );
    expect(el2.html().includes('mdc-select-helper-text--persistent')).toBe(
      true
    );
  });

  it('can have empty placeholder', () => {
    const el = mount(
      <Select
        placeholder=""
        options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
      />
    );

    // make sure the label is not floating
    expect(el.html().includes('mdc-select__label--float-above')).toBe(false);

    // make sure we have 4 options
    expect(el.find('option').length).toBe(4);
  });

  it('can accept options array', () => {
    mount(<Select placeholder="Select a food" options={['1', '2', '3']} />);
  });

  it('can be outlined', () => {
    const el = mount(<Select outlined options={['1', '2', '3']} />);
    expect(el.html().includes('mdc-select--outlined')).toBe(true);
  });

  it('can accept formatted options array', () => {
    mount(
      <Select
        placeholder="Select a food"
        options={[
          {
            label: 'Cookies',
            value: '1'
          },
          {
            label: 'Pizza',
            value: '2',
            'aria-disabled': true,
            tabIndex: -1
          },
          {
            label: 'Icecream',
            value: '3'
          }
        ]}
      />
    );
  });

  it('can have a tab index', () => {
    const el = mount(<Select tabIndex={1} options={['1', '2', '3']} />);
    expect(!!~el.html().search('tabindex="1"')).toEqual(true);
  });

  it('can have custom rootProps', () => {
    mount(<Select rootProps={{ name: 'test' }} />);
  });

  it.skip('can be disabled', async (done) => {
    const el = mount(<Select disabled={false} options={['1', '2', '3']} />);

    expect(el.html().includes('mdc-select--disabled')).toBe(false);
    el.setProps({ disabled: true });

    expect(el.html().includes('mdc-select--disabled')).toBe(true);
    done();
  });

  it('can have custom classnames', () => {
    const el = mount(
      <Select
        className={'my-custom-classname'}
        options={{ 1: 'Cookies', 2: 'Pizza', 3: 'Icecream' }}
      />
    );

    expect(
      el.find('.mdc-select').first().hasClass('my-custom-classname')
    ).toEqual(true);
  });

  it.skip('can autofocus', () => {
    const el = mount(<Select options={['one', 'two', 'three']} autoFocus />);
    expect(document.activeElement).toBe(el.find('select').getDOMNode());
  });
});

describe('Select: Lifecycle', () => {
  const getLabel = (el: ReactWrapper) =>
    el.find('.mdc-select__selected-text').first().text().trim();

  it('SelectedText is blank with no value', () => {
    const el = mount(<Select options={['Cookies', 'Pizza', 'Icecream']} />);
    expect(getLabel(el)).toBe('');
  });

  it('SelectedText is blank with no value, enhanced', () => {
    const el = mount(
      <Select enhanced options={['Cookies', 'Pizza', 'Icecream']} />
    );
    expect(getLabel(el)).toBe('');
  });

  it('SelectedText is blank with incorrect defaultValue', () => {
    const el = mount(
      <Select options={['Cookies', 'Pizza', 'Icecream']} defaultValue="Foo" />
    );
    expect(getLabel(el)).toBe('');
  });

  it('SelectedText is blank with incorrect defaultValue, enhanced', () => {
    const el = mount(
      <Select
        enhanced
        options={['Cookies', 'Pizza', 'Icecream']}
        defaultValue="Foo"
      />
    );
    expect(getLabel(el)).toBe('');
  });

  it('SelectedText is set to value', () => {
    const el = mount(
      <Select options={['Cookies', 'Pizza', 'Icecream']} value="Cookies" />
    );
    expect(getLabel(el)).toBe('Cookies');
  });

  it('SelectedText is set to value, enhanced', () => {
    const el = mount(
      <Select
        enhanced
        options={['Cookies', 'Pizza', 'Icecream']}
        value="Cookies"
      />
    );
    expect(getLabel(el)).toBe('Cookies');
  });

  it('SelectedText is set to default value', () => {
    const el = mount(
      <Select
        options={['Cookies', 'Pizza', 'Icecream']}
        defaultValue="Cookies"
      />
    );
    expect(getLabel(el)).toBe('Cookies');
  });

  it('SelectedText is set to default value, enhanced', () => {
    const el = mount(
      <Select
        enhanced
        options={['Cookies', 'Pizza', 'Icecream']}
        defaultValue="Cookies"
      />
    );
    expect(getLabel(el)).toBe('Cookies');
  });

  it('SelectedText is set with async value', (done) => {
    const el = mount(
      <Select options={['Cookies', 'Pizza', 'Icecream']} value="" />
    );

    setTimeout(() => {
      el.setProps({ value: 'Cookies' });
      expect(getLabel(el)).toBe('Cookies');
      done();
    }, 100);
  });

  it('SelectedText is set with async value, enhanced', (done) => {
    const el = mount(
      <Select enhanced options={['Cookies', 'Pizza', 'Icecream']} value="" />
    );

    setTimeout(() => {
      el.setProps({ value: 'Cookies' });
      expect(getLabel(el)).toBe('Cookies');
      done();
    }, 100);
  });
});
