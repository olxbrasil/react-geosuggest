import React from 'react';
import classnames from 'classnames';

/**
 * A single Geosuggest item in the list
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
export default class SuggestItem extends React.PureComponent {
  /**
   * When the suggest item got clicked
   * @param {Event} event The click event
   */
  onClick = event => {
    event.preventDefault();
    this.props.onSelect(this.props.suggest);
  }

  /**
   * Render the view
   * @return {Function} The React element to render
   */
  render() {
    const classes = classnames(
      'geosuggest-item',
      this.props.className,
      this.props.suggestItemClassName,
      {'geosuggest-item--active': this.props.isActive},
      {[this.props.activeClassname]: this.props.activeClassname ?
        this.props.isActive : null}
    );

    return <li className={classes}
      style={this.props.style}
      onMouseDown={this.props.onMouseDown}
      onMouseOut={this.props.onMouseOut}
      onClick={this.onClick}>
        {this.props.suggest.label}
    </li>;
  }
}

/**
 * Default values for the properties
 * @type {Object}
 */
SuggestItem.defaultProps = {
  isActive: false,
  className: '',
  suggest: {}
};
