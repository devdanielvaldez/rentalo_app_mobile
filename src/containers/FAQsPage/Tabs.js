import React, { useState } from 'react';
import classNames from 'classnames';

import css from './FAQsPage.module.css';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className={css.faqTabList}>
        {React.Children.map(children, (child, index) => (
          <button
            className={classNames(css.tab, {[css.active]: activeTab === index})}
            onClick={() => setActiveTab(index)}
          >
            {child.props.label}
          </button>
        ))}
      </div>

      <div>
        {React.Children.toArray(children)[activeTab]}
      </div>
    </div>
  );
};

export default Tabs;
