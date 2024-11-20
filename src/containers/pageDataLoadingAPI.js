/**
 * Export loadData calls from ducks modules of different containers
 */
import { setInitialValues as CheckoutPageInitialValues } from './CheckoutPage/CheckoutPage.duck';
import { loadData as ContactDetailsPageLoader } from './ContactDetailsPage/ContactDetailsPage.duck';
import { loadData as EditListingPageLoader } from './EditListingPage/EditListingPage.duck';
import { loadData as EmailVerificationPageLoader } from './EmailVerificationPage/EmailVerificationPage.duck';
import { loadData as VerificationPageLoader } from './VerificationPage/VerificationPage.duck';
import { loadData as InboxPageLoader } from './InboxPage/InboxPage.duck';
import { loadData as PanelPageLoader } from './PanelPage/PanelPage.duck';

import { loadData as BookingDetailsPageLoader } from './BookingDetailsPage/BookingDetailsPage.duck';


import { loadData as ListingPageLoader } from './ListingPage/ListingPage.duck';
import { loadData as ManageListingsPageLoader } from './ManageListingsPage/ManageListingsPage.duck';
import { loadData as DashBoardPageLoader } from './DashBoardPage/DashBoardPage.duck';

import { loadData as PaymentMethodsPageLoader } from './PaymentMethodsPage/PaymentMethodsPage.duck';
import { loadData as ProfilePageLoader } from './ProfilePage/ProfilePage.duck';
import { loadData as SearchPageLoader } from './SearchPage/SearchPage.duck';
import { loadData as FavListingsPageLoader } from './FavListingsPage/FavListingPage.duck';

import { loadData as StripePayoutPageLoader } from './StripePayoutPage/StripePayoutPage.duck';
import { loadData as HostDetailsPageLoader } from './HostDetailsPage/HostDetailsPage.duck';
import { loadData as DriverApprovalPageLoader } from './DriverApprovalPage/DriverApprovalPage.duck';
import {
  loadData as TransactionPageLoader,
  setInitialValues as TransactionPageInitialValues,
} from './TransactionPage/TransactionPage.duck';
import { loadData as HostAccountDeatilsLoader } from './HostAccountDetails/HostAccountDeatils.duck';
import { loadData as PayoutDetailsPageLoader } from './PayoutDetailsPage/PayoutDetailsPage.duck';

const getPageDataLoadingAPI = () => {
  return {
    CheckoutPage: {
      setInitialValues: CheckoutPageInitialValues,
    },
    ContactDetailsPage: {
      loadData: ContactDetailsPageLoader,
    },
    EditListingPage: {
      loadData: EditListingPageLoader,
    },
    EmailVerificationPage: {
      loadData: EmailVerificationPageLoader,
    },
    VerificationPage: {
      loadData: VerificationPageLoader,
    },
    InboxPage: {
      loadData: InboxPageLoader,
    },
    BookingDetailsPage: {
      loadData: BookingDetailsPageLoader,
    },
    PanelPage: {
      loadData: PanelPageLoader,
    },
    // AdobePage: {
    //   loadData: AdobePageLoader,
    // },
    HostDetailsPage: {
      loadData: HostDetailsPageLoader,
    },
    ListingPage: {
      loadData: ListingPageLoader,
    },
    ManageListingsPage: {
      loadData: ManageListingsPageLoader,
    },
    DashBoardPage: {
      loadData: DashBoardPageLoader,
    },
    PaymentMethodsPage: {
      loadData: PaymentMethodsPageLoader,
    },
    DriverApprovalPage: {
      loadData: DriverApprovalPageLoader,
    },
    ProfilePage: {
      loadData: ProfilePageLoader,
    },
    SearchPage: {
      loadData: SearchPageLoader,
    },
    FavListingsPage: {
      loadData: FavListingsPageLoader,
    },
    StripePayoutPage: {
      loadData: StripePayoutPageLoader,
    },
    TransactionPage: {
      loadData: TransactionPageLoader,
      setInitialValues: TransactionPageInitialValues,
    },
    HostAccountDeatils: {
      loadData: HostAccountDeatilsLoader,
    },
    PayoutDetailsPage: {
      loadData: PayoutDetailsPageLoader,
    }
  };
};

export default getPageDataLoadingAPI;
