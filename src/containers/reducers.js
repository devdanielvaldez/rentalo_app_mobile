/**
 * Export reducers from ducks modules of different containers (i.e. default export)
 * We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */
import CheckoutPage from './CheckoutPage/CheckoutPage.duck';
import ContactDetailsPage from './ContactDetailsPage/ContactDetailsPage.duck';
import EditListingPage from './EditListingPage/EditListingPage.duck';
import InboxPage from './InboxPage/InboxPage.duck';
import ListingPage from './ListingPage/ListingPage.duck';
import DriverApprovalPage from './DriverApprovalPage/DriverApprovalPage.duck';
import HostDetailsPage from './HostDetailsPage/HostDetailsPage.duck';
import ManageListingsPage from './ManageListingsPage/ManageListingsPage.duck';
import PasswordChangePage from './PasswordChangePage/PasswordChangePage.duck';
import PasswordRecoveryPage from './PasswordRecoveryPage/PasswordRecoveryPage.duck';
import PasswordResetPage from './PasswordResetPage/PasswordResetPage.duck';
import PaymentMethodsPage from './PaymentMethodsPage/PaymentMethodsPage.duck';
import ProfilePage from './ProfilePage/ProfilePage.duck';
import ProfileSettingsPage from './ProfileSettingsPage/ProfileSettingsPage.duck';
import SearchPage from './SearchPage/SearchPage.duck';
import StripePayoutPage from './StripePayoutPage/StripePayoutPage.duck';
import TransactionPage from './TransactionPage/TransactionPage.duck';
import PanelPage from './PanelPage/PanelPage.duck';
import DashBoard from './DashBoardPage/DashBoardPage.duck'
import BookingDetails from './BookingDetailsPage/BookingDetailsPage.duck'
import FavListingsPage from './FavListingsPage/FavListingPage.duck';
import PayoutDetailsPage from './PayoutDetailsPage/PayoutDetailsPage.duck';
import DeleteAccountPage from './DeleteAccountPage/DeleteAccountPage.duck';
import HostAccountDeatils from './HostAccountDetails/HostAccountDeatils.duck';

export {
  CheckoutPage,
  ContactDetailsPage,
  DeleteAccountPage,
  EditListingPage,
  InboxPage,
  ListingPage,
  DriverApprovalPage,
  HostDetailsPage,
  ManageListingsPage,
  PasswordChangePage,
  PasswordRecoveryPage,
  PasswordResetPage,
  PaymentMethodsPage,
  ProfilePage,
  ProfileSettingsPage,
  SearchPage,
  StripePayoutPage,
  TransactionPage,
  PanelPage,
  DashBoard,
  BookingDetails,
  FavListingsPage,
  PayoutDetailsPage,
  HostAccountDeatils,
};
