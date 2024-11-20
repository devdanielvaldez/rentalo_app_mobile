import React, { useState } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import { arrayOf, array, bool, func, node, oneOfType, shape, string } from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import { propTypes, LISTING_STATE_CLOSED, LINE_ITEM_NIGHT, LINE_ITEM_DAY } from '../../util/types';
import { formatMoney } from '../../util/currency';
import { parse, stringify } from '../../util/urlHelpers';
import config from '../../config';
import { ModalInMobile, Button, Modal, IconFeatherArrowRight } from '../../components';
import { BookingDatesForm } from '../../forms';
import DetailsModalContent from './DetailsModalContent';
import ContractModalContent from './ContractModalContent';
import css from './BookingPanel.module.css';
import { useSelector } from 'react-redux';

// This defines when ModalInMobile shows content as Modal
const MODAL_BREAKPOINT = 1023;

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: `(${price.currency})`,
      priceTitle: `Unsupported currency (${price.currency})`,
    };
  }
  return {};
};

const openBookModal = (isOwnListing, isClosed, history, location) => {
  if (isOwnListing || isClosed) {
    window.scrollTo(0, 0);
  } else {
    const { pathname, search, state } = location;
    const searchString = `?${stringify({ ...parse(search), book: true })}`;
    history.push(`${pathname}${searchString}`, state);
  }
};

const closeBookModal = (history, location) => {
  const { pathname, search, state } = location;
  const searchParams = omit(parse(search), 'book');
  const searchString = `?${stringify(searchParams)}`;
  history.push(`${pathname}${searchString}`, state);
};

const BookingPanel = props => {
  const {
    rootClassName,
    className,
    // titleClassName,
    listing,
    isOwnListing,
    unitType,
    onSubmit,
    // title,
    // subTitle,
    // authorDisplayName,
    onManageDisableScrolling,
    timeSlots,
    fetchTimeSlotsError,
    history,
    location,
    intl,
    onFetchTransactionLineItems,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    isApprovedToDrive,
    modalTitle,
    isExtend,
    isExtendTripModal,
    onValidateVoucher,
    voucherValid,
    voucherInProgress,
    voucherRequested,
    authorId,
    included,
    transactions,
  } = props;

  const { currentUser } = useSelector(state => state.user);
  const price = listing.attributes.price;
  const noticePeriod = listing.attributes?.publicData?.noticPeriod;

  const hasListingState = !!listing.attributes.state;
  const isClosed = hasListingState && listing.attributes.state === LISTING_STATE_CLOSED;
  const showBookingDatesForm = hasListingState && !isClosed;
  // const showClosedListingHelpText = listing.id && isClosed;
  const { formattedPrice, priceTitle } = priceData(price, intl);
  const isBook = !!parse(location.search).book;

  // const subTitleText = !!subTitle
  //   ? subTitle
  //   : showClosedListingHelpText
  //   ? intl.formatMessage({ id: 'BookingPanel.subTitleClosedListing' })
  //   : null;

  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;

  const unitTranslationKey = isNightly
    ? 'BookingPanel.perNight'
    : isDaily
    ? 'BookingPanel.perDay'
    : 'BookingPanel.perUnit';

  const classes = classNames(
    rootClassName || css.root,
    className,
    isExtendTripModal ? css.extendTripModal : null
  );
  // const titleClasses = classNames(titleClassName || css.bookingTitle);

  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function openModal1() {
    setOpen(true);
  }

  function openModal2() {
    setIsOpen(true);
  }

  return (
    <div className={classes}>
      <ModalInMobile
        containerClassName={css.modalContainer}
        id="BookingDatesFormInModal"
        isModalOpenOnMobile={isBook}
        onClose={() => closeBookModal(history, location)}
        showAsModalMaxWidth={MODAL_BREAKPOINT}
        onManageDisableScrolling={onManageDisableScrolling}
        modalTitle={modalTitle}
        isBookingModal={true}
      >
        {/* <div className={css.modalHeading}>
          <h1 className={css.title}>{title}</h1>
          <div className={css.author}>
            <FormattedMessage id="BookingPanel.hostedBy" values={{ name: authorDisplayName }} />
          </div>
        </div> */}

        {/* <div className={css.bookingHeading}>
          <h2 className={titleClasses}>{title}</h2>
          {subTitleText ? <div className={css.bookingHelp}>{subTitleText}</div> : null}
        </div> */}
        {showBookingDatesForm ? (
          <BookingDatesForm
            className={css.bookingForm}
            formId="BookingPanel"
            noticePeriod={noticePeriod}
            submitButtonWrapperClassName={css.bookingDatesSubmitButtonWrapper}
            unitType={unitType}
            isExtend={isExtend}
            currentUser={currentUser}
            onSubmit={onSubmit}
            price={price}
            listingId={listing.id}
            isOwnListing={isOwnListing}
            timeSlots={timeSlots}
            fetchTimeSlotsError={fetchTimeSlotsError}
            onFetchTransactionLineItems={onFetchTransactionLineItems}
            lineItems={lineItems}
            fetchLineItemsInProgress={fetchLineItemsInProgress}
            fetchLineItemsError={fetchLineItemsError}
            listing={listing}
            isApprovedToDrive={isApprovedToDrive}
            isBookingPanelForm={true}
            onValidateVoucher={onValidateVoucher}
            voucherValid={voucherValid}
            voucherInProgress={voucherInProgress}
            voucherRequested={voucherRequested}
            authorId={authorId}
            transactions={transactions}
          />
        ) : null}
      </ModalInMobile>
      <div className={css.openBookingForm}>
        <div className={css.priceContainer}>
          <div className={css.priceValue} title={priceTitle}>
            {formattedPrice}
          </div>
          <div className={css.perUnit}>
            <FormattedMessage id={unitTranslationKey} />
          </div>
        </div>

        {showBookingDatesForm ? (
          <Button
            rootClassName={css.bookButton}
            onClick={() => openBookModal(isOwnListing, isClosed, history, location)}
          >
            <FormattedMessage id="BookingPanel.ctaButtonMessage" />
          </Button>
        ) : isClosed ? (
          <div className={css.closedListingButton}>
            <FormattedMessage id="BookingPanel.closedListingButtonText" />
          </div>
        ) : null}
      </div>

      {!isExtend && (
        <div className={css.infoSections}>
          <div className={css.infoSection}>
            <div className={css.infoSectionTitle}>Detalles de la poliza</div>
            <div className={css.infoSectionBody}>
              <ul>
                <li>Seguro y asistencia en carretera 24/7 incluidos en el precio del viaje.</li>
              </ul>
            </div>
            <div className={css.infoSectionLearnMore} onClick={openModal1}>
              Conocer más <IconFeatherArrowRight />
            </div>
            <Modal
              id="Detalles"
              isOpen={open}
              onClose={() => {
                setOpen(false);
              }}
              onManageDisableScrolling={() => {}}
              modalTitle="Principales riesgos cubiertos"
            >
              <DetailsModalContent />
            </Modal>
          </div>

          <div className={css.infoSection}>
            <div className={css.infoSectionTitle}>Contrato de arrendamiento</div>
            <div className={css.infoSectionBody}>
              Aprende más sobre el contrato de arrendamiento
            </div>
            <div className={css.infoSectionLearnMore} onClick={openModal2}>
              Conocer más <IconFeatherArrowRight />
            </div>
            <Modal
              id="Contrato"
              isOpen={isOpen}
              onClose={() => {
                setIsOpen(false);
              }}
              onManageDisableScrolling={() => {}}
              modalTitle="Contrato de arrendamiento"
            >
              <ContractModalContent />
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
};

BookingPanel.defaultProps = {
  rootClassName: null,
  className: null,
  titleClassName: null,
  isOwnListing: false,
  subTitle: null,
  unitType: config.bookingUnitType,
  timeSlots: null,
  fetchTimeSlotsError: null,
  lineItems: null,
  fetchLineItemsError: null,
};

BookingPanel.propTypes = {
  rootClassName: string,
  className: string,
  titleClassName: string,
  listing: oneOfType([propTypes.listing, propTypes.ownListing]),
  isOwnListing: bool,
  unitType: propTypes.bookingUnitType,
  onSubmit: func.isRequired,
  title: oneOfType([node, string]).isRequired,
  subTitle: oneOfType([node, string]),
  authorDisplayName: oneOfType([node, string]).isRequired,
  onManageDisableScrolling: func.isRequired,
  timeSlots: arrayOf(propTypes.timeSlot),
  fetchTimeSlotsError: propTypes.error,
  onFetchTransactionLineItems: func.isRequired,
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

export default compose(withRouter, injectIntl)(BookingPanel);
