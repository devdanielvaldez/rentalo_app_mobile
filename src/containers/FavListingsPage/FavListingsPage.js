import React from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
} from '../../components';
import css from './FavListingsPage.module.css';
import ListingCardTall from '../../components/ListingCardTall/ListingCardTall';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import noResultsImg from '../../assets/no-results.png';
import { useSelector } from 'react-redux';
import { getListingsById } from '../../ducks/marketplaceData.duck';

const FavListingsPage = () => {
  const state = useSelector(state => state);
  const user = state.user.currentUser;
  const currentPageResultIds = state.FavListingsPage.currentPageResultIds;
  const pageListings = getListingsById(state, currentPageResultIds);
  const listings = pageListings.filter(listing =>
    user?.attributes?.profile.publicData?.bookmark?.includes(listing.id.uuid)
  );
  const pageName = ['Tus vehículos favoritos'];
  const { isAuthenticated } = useSelector(state => state.Auth);
  const panelMediumWidth = 50;
  const panelLargeWidth = 62.5;
  const cardRenderSizes = [
    '(max-width: 767px) 100vw',
    `(max-width: 1023px) ${panelMediumWidth}vw`,
    `(max-width: 1920px) ${panelLargeWidth / 2}vw`,
    `${panelLargeWidth / 3}vw`,
  ].join(', ');
  // prettier-ignore
  return (
    <StaticPage
      title="Tus vehículos favoritos"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'FavListingsPage',
        description: 'Favorite',
        name: 'Favorite listings page',
      }}
      description="Tus vehículos favoritos"
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} />
          <div className={css.sideNav}>
            <ProfileNav />
          </div>
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <div className={isAuthenticated ? css.contentWrapper : css.noWrapper}>
            <div className={css.mobile}>
              <p className={css.mobileText}>listados favoritos</p>
            </div>
            <h1 className={css.title}>{pageName}</h1>
            {listings.length === 0 ?
              <div className={css.noResults}>
                <img src={noResultsImg} alt="no results image" />
                <h2>Aún no tienes vehículos favoritos</h2>
                <p>Cuando indiques que te gustan ciertos vehículos, aquí tendrás la lista.</p>
              </div> :
              <div className={css.favListingContainer}>
                {listings.map(l => {
                  return (
                    <ListingCardTall
                      className={css.listingCard}
                      key={l.id.uuid}
                      listing={l}
                      listingExpanded={l}
                      renderSizes={cardRenderSizes}
                      setActiveListing={() => { }}
                      favListings={true}
                    />
                  )
                })}
              </div>
            }
          </div>
        </LayoutWrapperMain>

        {/* <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter> */}

      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default FavListingsPage;
