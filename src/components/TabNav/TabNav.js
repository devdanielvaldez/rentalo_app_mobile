import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { NamedLink } from '../../components';

import css from './TabNav.module.css';

const Tab = props => {
  const { className, id, disabled, text, selected, linkProps, isEditlstingTabs } = props;
  const completed = linkProps.completed;
  const noMark = linkProps.noMark;

  const linkClasses = classNames(css.link, {
    [css.selectedLink]: selected,
    [css.disabled]: disabled,
  });
  return (
    <div id={id} className={className}>
      <NamedLink className={linkClasses} {...linkProps}>
        {text}
      </NamedLink>
    </div>
  );
};

Tab.defaultProps = { className: null, disabled: false, selected: false };

const { arrayOf, bool, node, object, string } = PropTypes;

Tab.propTypes = {
  id: string.isRequired,
  className: string,
  text: node.isRequired,
  disabled: bool,
  selected: bool,
  linkProps: object.isRequired,
};

const TabNav = props => {
  const {
    className,
    rootClassName,
    tabRootClassName,
    tabs,
    isEditlstingTabs,
    isVerficationDetailsTab,
    isInboxPageTabs,
  } = props;
  const classes = classNames(
    rootClassName || css.root,
    className,
    isEditlstingTabs ? css.editlstingTabs : null,
    isVerficationDetailsTab ? css.verficationDetailsTab : null,
    isInboxPageTabs ? css.inboxPageTabs : null
  );
  const tabClasses = tabRootClassName || css.tab;
  return (
    <nav className={classes}>
      {tabs.map((tab, index) => {
        const id = typeof tab.id === 'string' ? tab.id : `${index}`;
        return (
          <>
            {/* {id === 'DriverApprovalPageTab' ? (
              <p className={css.firstLabel}>Datos conductor</p>
            ) : null}
            {id === 'HostDetailsPageTab' ? (
              <p className={css.secondLabel}>Datos propietario</p>
            ) : null} */}
            <Tab key={id} id={id} className={tabClasses} {...tab} />
          </>
        );
      })}
    </nav>
  );
};

TabNav.defaultProps = {
  className: null,
  rootClassName: null,
  tabRootClassName: null,
  tabClassName: null,
};

TabNav.propTypes = {
  className: string,
  rootClassName: string,
  tabRootClassName: string,
  tabs: arrayOf(object).isRequired,
};

export default TabNav;
