/**
 * This is a wrapper component for different Layouts.
 * Navigational 'aside' content should be added to this wrapper.
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TabNav } from '../../components';

import css from './LayoutWrapperSideNav.module.css';

const LayoutWrapperSideNav = props => {
  const { className, rootClassName, children, tabs, isVerficationDetailsTab } = props;
  const classes = classNames(rootClassName || css.root, className);
  const tabsWithUniqueKeys = tabs
    ? tabs.map((tab, index) => ({ ...tab, key: `tab-${index}` }))
    : null;

  return (
    <aside className={classes}>
      {tabs ? (
        <TabNav
          isVerficationDetailsTab={isVerficationDetailsTab}
          rootClassName={css.tabs}
          tabRootClassName={css.tab}
          tabs={tabsWithUniqueKeys} // Use the new array with unique keys
        />
      ) : null}
      {children}
    </aside>
  );
};

LayoutWrapperSideNav.defaultProps = {
  className: null,
  rootClassName: null,
  children: null,
  tabs: null,
};

const { node, string, array } = PropTypes;

LayoutWrapperSideNav.propTypes = {
  children: node,
  className: string,
  rootClassName: string,
  tabs: array,
};

export default LayoutWrapperSideNav;
