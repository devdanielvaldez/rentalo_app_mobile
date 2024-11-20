import React from 'react'
import { useSelector } from 'react-redux'
import { LayoutWrapperMain, LayoutWrapperTopbar, SideNav } from '../../components';
import DashBoard from '../../components/Dashboard/Dashboard';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import TopbarContainer from '../TopbarContainer/TopbarContainer';
import css from './DashBoardPage.module.css';

const DashBoardPage = (props) => {
  const state = useSelector(state => state);
  const { transactionRefs } = state.DashBoard
  const transactions = getMarketplaceEntities(state, transactionRefs)

  const { currentUser } = state.user
  const userId = currentUser && currentUser?.id


  return (
    <div>
      <LayoutWrapperTopbar>
        <TopbarContainer pageName={'Panel'} />
        <div >
          <SideNav currentUser={currentUser} />
        </div>
      </LayoutWrapperTopbar>
      <LayoutWrapperMain className={css.staticPageWrapper}>
        <DashBoard
          transactions={transactions}
          userId={userId}
        />
      </LayoutWrapperMain>

      {/* <LayoutWrapperFooter>
        <Footer />
      </LayoutWrapperFooter> */}

    </div>

  )
}




export default DashBoardPage
