import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';

import filterInputAttributes from './filter-input-attributes';

/**
 * The input field
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
class Input extends React.PureComponent {
  onRef = el => {
    this.input = el;
  }

  /**
   * When the input got changed
   */
  onChange = () => {
    this.props.onChange(this.input.value);
  }

  /**
   * When the input got focused
   */
  onFocus = () => {
    this.props.onFocus();
  }

  /**
   * When the input loses focus
   */
  onBlur = () => {
    this.props.onBlur();
  }

  /**
   * When a key gets pressed in the input
   * @param  {Event} event The keypress event
   */
  onInputKeyDown = event => {
    switch (event.which) {
      case 40: // DOWN
        event.preventDefault();
        this.props.onNext();
        break;
      case 38: // UP
        event.preventDefault();
        this.props.onPrev();
        break;
      case 13: // ENTER
        if (this.props.ignoreEnter) {
          event.preventDefault();
        }

        this.props.onSelect();
        break;
      case 9: // TAB
        if (!this.props.ignoreTab) {
          this.props.onSelect();
        }
        break;
      case 27: // ESC
        this.props.onEscape();
        break;
      /* istanbul ignore next */
      default:
        break;
    }
  }

  /**
   * Focus the input
   */
  focus() {
    this.input.focus();
  }

  /**
   * Render the view
   * @return {Function} The React element to render
   */
  render() {
    const attributes = filterInputAttributes(this.props),
      classes = classnames(
        'geosuggest__input',
        this.props.className
      );

    return <input className={classes}
      ref={this.onRef}
      type='text'
      autoComplete='off'
      {...attributes}
      value={typeof this.props.value === 'string' ? this.props.value : this.props.value.props.inputValue}
      style={this.props.style}
      onKeyDown={this.onInputKeyDown}
      onChange={this.onChange}
      onFocus={this.onFocus}
      onBlur={this.onBlur} />;
  }
}

/**
 * Default values for the properties
 * @type {Object}
 */
Input.defaultProps = {
  className: '',
  value: '',
  ignoreTab: false
};

export default Input;
