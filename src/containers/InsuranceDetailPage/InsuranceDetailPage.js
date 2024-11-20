import React from 'react';
import { TopbarContainer } from '../../containers';
import {
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  LayoutWrapperAccountSettingsSideNav,
  LayoutSideNavigation,
  Footer,
  Page,
} from '../../components';
import css from './InsuranceDetailPage.module.css';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../ProfileSettingsPage/ProfileSettingsPage.duck';
import InsuranceDetailsForm from './InsuranceDetailsForm';

const InsuranceDetailPage = () => {
  const { currentUser } = useSelector(state => state?.user);
  const { updateInProgress } = useSelector(state => state?.ProfileSettingsPage);
  // const [inSubmitProgress, setInSubmitProgress] = useState(false)
  const dispatch = useDispatch()
  const pageName = ['Configuración'];
  const {protectedData} = currentUser?.attributes?.profile || {};
  const {hostInsuranceDetails={}} = protectedData || {};

    const handleSubmit = (values) => {
        try {
            const updatedValues = {
                protectedData: { hostInsuranceDetails: values },
            };
            dispatch(updateProfile(updatedValues));

        } catch (error) {
            console.log('error', error)
        }
    }

  return (
    <Page title="InsuranceDetailPage">
      <LayoutSideNavigation>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} />
          <div className={css.sideNav}>
            <ProfileNav currentUser={currentUser}
            />
          </div>
        </LayoutWrapperTopbar>
        <LayoutWrapperAccountSettingsSideNav
          currentTab="InsuranceDetailPage"
          currentUser={currentUser}
          isVerficationDetailsTab={true}
        />
        <LayoutWrapperMain>
          <h1 className={css.title}>Información personal básica para un individuo:</h1>
          <div className={css.hostlWrapper}>
            <InsuranceDetailsForm
              className={css.form}
              inSubmitProgress={updateInProgress}
              initialValues={hostInsuranceDetails}
              onSubmit={values => {
                handleSubmit(values);
              }}
              currentUser={currentUser}
            />
          </div>
        </LayoutWrapperMain>

        {/* <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter> */}

      </LayoutSideNavigation>
    </Page>
  );
};

export default InsuranceDetailPage;
