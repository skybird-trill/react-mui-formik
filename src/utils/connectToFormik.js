import {
  Children,
  cloneElement,
  isValidElement,
} from "react";

import objectPath from "object-path";

/**
 * @function
 * @param {React.ReactElement} el
 * @param {Object} options
 * @returns {React.ReactElement}
 */
const connectToFormik = (el, options) => {
  if (!isValidElement(el)) return el;

  const elId = el.props.id || el.props.name;

  if (elId) {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
    } = options;

    const elTouched = objectPath.get(touched, elId);
    const elErrors = objectPath.get(errors, elId);

    return cloneElement(el, {
      ...el.props,
      value: objectPath.get(values, elId),
      onChange: handleChange,
      onBlur: handleBlur,
      error: elTouched && Boolean(elErrors),
      helperText: elTouched && elErrors,
    });
  }

  if (el.props.children) {
    const mappedChildren = Children.map(el.props.children, child => connectToFormik(child, options));

    return cloneElement(el, { children: mappedChildren });
  }

  if (typeof el.type === "function") {
    return connectToFormik(el.type(el.props), options);
  }

  return el;
};

export default connectToFormik;
