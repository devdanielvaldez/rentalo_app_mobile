import React from 'react';
import { useSelector } from 'react-redux';
import {
  BookingDetailsPanel,
  Footer,
  LayoutWrapperFooter,
  LayoutWrapperMain,
  LayoutWrapperTopbar,
  SideNav,
} from '../../components';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import css from './BookingDetailsPage.module.css';

const BookingDetailsPage = props => {
  const state = useSelector(state => state);
  const { transactionRefs } = state.BookingDetails;
  const transactions = getMarketplaceEntities(state, transactionRefs);
  const { currentUser } = state.user;
  const userId = currentUser && currentUser?.id;
  const { isAuthenticated } = useSelector(state => state.Auth);

  return (
    <div>
      <LayoutWrapperTopbar>
        <TopbarContainer pageName={'Panel'} />
        <div className={css.sideNav}>
          <SideNav currentUser={currentUser} />
        </div>
      </LayoutWrapperTopbar>
      <LayoutWrapperMain
        className={isAuthenticated ? css.staticPageWrapper : css.noWrapper}
      >
        <BookingDetailsPanel transactions={transactions} userId={userId} />
      </LayoutWrapperMain>
      <LayoutWrapperFooter>
        <Footer />
      </LayoutWrapperFooter>
    </div>
  );
};

export default BookingDetailsPage;
