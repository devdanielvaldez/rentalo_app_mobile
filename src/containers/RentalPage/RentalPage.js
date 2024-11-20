import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { TopbarContainer } from '..';
import {
  Page,
  LayoutSideNavigation,
  LayoutWrapperMain,
  LayoutWrapperSideNav,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import config from '../../config';

import css from './RentalPage.module.css';
import SideNav from '../../components/SideNav/SideNav';

const RentalPageComponent = props => {
  const { scrollingDisabled, intl } = props;
  const { isAuthenticated } = useSelector(state => state.Auth);

  const pageName = ['Política de privacidad'];

  const tabs = [
    {
      text: intl.formatMessage({ id: 'PrivacyPolicyPage.privacyTabTitle' }),
      selected: false,
      linkProps: {
        name: 'PrivacyPolicyPage',
      },
      lastUpdated: 'Last updated: October 30, 2017',
    },
    {
      text: intl.formatMessage({ id: 'PrivacyPolicyPage.tosTabTitle' }),
      selected: false,
      linkProps: {
        name: 'TermsOfServicePage',
      },
      lastUpdated: 'Last updated: October 30, 2017',
    },
    {
      text: intl.formatMessage({ id: 'TermsOfServicePage.rentalTabTitle' }),
      selected: true,
      linkProps: {
        name: 'RentalPage',
      },
    },
  ];
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage({ id: 'RentalPage.schemaTitle' }, { siteTitle });
  const schema = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    name: schemaTitle,
  };
  return (
    <Page title={schemaTitle} scrollingDisabled={scrollingDisabled} schema={schema}>
      <LayoutSideNavigation isStaticPage={true}>
        <LayoutWrapperTopbar>
          <TopbarContainer pageName={pageName} currentPage="RentalPage" />
          <div className={css.sideNav}>
            <SideNav />
          </div>
        </LayoutWrapperTopbar>
        <LayoutWrapperMain
          className={isAuthenticated ? css.staticPageWrapper : css.noWrapper}>
          <div className={css.contentWrapper}>
            <LayoutWrapperSideNav tabs={tabs} className={css.sideNavWrapper} />
            <div className={css.content}>

            <p><strong>CONTRATO DE ARRENDAMIENTO</strong></p>
<p>Este contrato de alquiler se celebra entre el Propietario y el Conductor (cada uno, una "&nbsp;parte&nbsp;" y colectivamente, las "&nbsp;partes&nbsp;") para el alquiler del Veh&iacute;culo en los siguientes t&eacute;rminos y condiciones.<br /><br /></p>
<ol>
<li><strong> INTERPRETACI&Oacute;N&nbsp;</strong></li>
</ol>
<p>1.1 Las definiciones y reglas de interpretaci&oacute;n en esta cl&aacute;usula se aplican en este acuerdo.<br /><br /> Conductor&nbsp;autorizado: una persona con una licencia v&aacute;lida para conducir en la jurisdicci&oacute;n en la que se conduce el Veh&iacute;culo, que ha sido verificada por Rentalo INC de acuerdo con sus pol&iacute;ticas y notificada al Conductor como conductor del Veh&iacute;culo;</p>
<p><br /> Rentalo INC: RENTALO INC.&nbsp;(EIN No.: 38-4159643), una empresa debidamente constituida en Estados Unidos con domicilio registrado en 651 N Broad St, Suite 206, en la ciudad de Middletown, Zip code 19709, y condado de New Castle.</p>
<p><br /> Hora de entrega: la hora y la fecha en que la &uacute;ltima de las partes haya confirmado a trav&eacute;s de la Plataforma la devoluci&oacute;n del Veh&iacute;culo al Propietario en el Lugar Designado;<br /><br /> Ubicaci&oacute;n designada: el lugar designado en el que el Conductor debe recoger o devolver el Veh&iacute;culo al Propietario, o cualquier otro lugar que las partes acuerden;</p>
<p><br /> Precio del viaje: las tarifas pagaderas al Propietario por el alquiler del Veh&iacute;culo por parte del Conductor, tal como se establece en el Anuncio, sin incluir las tarifas de servicio u otras tarifas pagaderas a Rentalo INC o cualquier otro tercero;</p>
<p><br /> Listado: el listado publicado en la Plataforma con respecto al Veh&iacute;culo;<br /> Propietario la persona, cuyos datos figuran en la Plataforma, que tiene un Veh&iacute;culo para alquilar en la Plataforma;<br /><br /> Conductor: la persona, cuyos datos figuran en la Plataforma, que tiene la intenci&oacute;n de alquilar un Veh&iacute;culo;</p>
<p><br /> Veh&iacute;culo: un veh&iacute;culo definido en el Art 5. la Ley de Movilidad y Tr&aacute;nsito No. 63-17 como un veh&iacute;culo de motor y registrado en la Autoridad competente como perteneciente a un Propietario y listado en la Plataforma por ese Propietario para alquiler;</p>
<p><br /> PDPA: Ley de Protecci&oacute;n de Datos Personales No. 172-13 Informaci&oacute;n personal tiene el significado que se le da en la PDPA;</p>
<p><br /> Hora de recogida: la hora y la fecha en que la &uacute;ltima de las partes haya confirmado la recogida a trav&eacute;s de la Plataforma del Veh&iacute;culo por parte del Conductor del Propietario en el Lugar Designado;</p>
<p><br /> Pol&iacute;ticas: cualquier pol&iacute;tica impuesta por Rentalo INC a los Conductores y/o Propietarios de vez en cuando, tal como se establece en la Plataforma;</p>
<p><br /> Plataforma: el sitio web de Rentalo INC (https://www.rentaloinc.com/) y/o sus aplicaciones m&oacute;viles asociadas;</p>
<p><br /> Periodo de alquiler: el per&iacute;odo de alquiler del Veh&iacute;culo seg&uacute;n lo acordado entre las partes a trav&eacute;s de la Plataforma;&nbsp;y</p>
<p><br /> Condiciones: los t&eacute;rminos de uso de la Plataforma, modificados o enmendados por Rentalo INC de vez en cuando.<br /><br /> 1.2 Los t&iacute;tulos de las cl&aacute;usulas y p&aacute;rrafos no afectar&aacute;n la interpretaci&oacute;n de este acuerdo.<br /><br /> 1.3 Una&nbsp;persona&nbsp;incluye una persona f&iacute;sica, una entidad corporativa o no incorporada (tenga o no personalidad jur&iacute;dica independiente) y los representantes legales y personales de esa persona, sucesores y cesionarios autorizados.<br /><br /> 1.4 Una referencia a una&nbsp;compa&ntilde;&iacute;a&nbsp;incluir&aacute; cualquier compa&ntilde;&iacute;a, corporaci&oacute;n u otra entidad corporativa, donde sea y como sea que est&eacute; constituida o establecida.<br /><br /> 1.5 A menos que el contexto requiera lo contrario, las palabras en singular incluir&aacute;n el plural y viceversa.<br /><br /> 1.6 A menos que el contexto requiera lo contrario, una referencia a un g&eacute;nero incluir&aacute; una referencia a los otros g&eacute;neros.<br /><br /> 1.7 Una referencia a una ley o disposici&oacute;n legal es una referencia a ella tal como est&aacute; en vigor en ese momento, teniendo en cuenta cualquier modificaci&oacute;n, ampliaci&oacute;n o nueva promulgaci&oacute;n, e incluye cualquier legislaci&oacute;n subordinada en vigor en ese momento hecha en virtud de ella.<br /><br /> 1.8 Una referencia a escrito o escrito incluye correo electr&oacute;nico.<br /><br /> 1.9 Cualquier palabra que siga a los t&eacute;rminos&nbsp;incluyendo&nbsp;,&nbsp;incluir&nbsp;,&nbsp;en particular&nbsp;o cualquier expresi&oacute;n similar se interpretar&aacute; como ilustrativa y no limitar&aacute; el sentido de las palabras, descripci&oacute;n, definici&oacute;n, frase o t&eacute;rmino que precede a esos t&eacute;rminos.<br /><br /></p>
<ol start="2">
<li><strong> ALQUILER DE VEH&Iacute;CULO&nbsp;</strong></li>
</ol>
<p>2.1 El Propietario alquilar&aacute; el Veh&iacute;culo al Conductor durante el Per&iacute;odo de alquiler, sujeto a los t&eacute;rminos y condiciones de este acuerdo.<br /><br /> 2.2 Las partes acuerdan que deber&aacute;n cumplir en todo momento con los T&eacute;rminos y las Pol&iacute;ticas vigentes.<br /><br /> 2.3 El Veh&iacute;culo seguir&aacute; siendo en todo momento propiedad del Propietario, y el Conductor no tendr&aacute; ning&uacute;n derecho, t&iacute;tulo o inter&eacute;s sobre el Veh&iacute;culo (salvo el derecho a la posesi&oacute;n y uso del Veh&iacute;culo durante el Per&iacute;odo de alquiler, sujeto a los t&eacute;rminos y condiciones de este acuerdo).<br /><br /> 2.4 El riesgo de p&eacute;rdida, robo, da&ntilde;o o destrucci&oacute;n del Veh&iacute;culo pasar&aacute; al Conductor a la Hora de Recogida.&nbsp;El Veh&iacute;culo permanecer&aacute; bajo el riesgo exclusivo del Conductor durante el Per&iacute;odo de alquiler y cualquier per&iacute;odo posterior durante el cual el Veh&iacute;culo est&eacute; en posesi&oacute;n, custodia o control del Conductor, hasta la Hora de entrega.<br /><br /> 2.5 Las partes acuerdan que deber&aacute;n cumplir en todo momento con las leyes o reglamentos aplicables, incluidas las leyes o reglamentos con respecto a la cobertura de seguros.<br /><br /> 2.6 Para evitar dudas, las partes acuerdan y reconocen que Rentalo INC no es parte de este acuerdo y es un mero proveedor de servicios de plataforma.<br /><br /></p>
<ol start="3">
<li><strong> TARIFAS</strong></li>
</ol>
<p>3.1.&nbsp;Como contraprestaci&oacute;n por el alquiler del Veh&iacute;culo al Conductor durante el Per&iacute;odo de alquiler, el Conductor deber&aacute; pagar el Precio del viaje al Propietario.<br /><br /> 3.2.&nbsp;Las partes acuerdan que el Precio del Viaje se pagar&aacute; al Propietario a trav&eacute;s de los servicios de pago ofrecidos a trav&eacute;s de la Plataforma, de conformidad con los T&eacute;rminos y las Pol&iacute;ticas.<br /><br /> 3.3.&nbsp;Las partes reconocen y aceptan pagar cualquier tarifa adicional establecida en las Pol&iacute;ticas, incluidas las tarifas pagaderas a la otra parte por millaje adicional, devoluci&oacute;n tard&iacute;a, aver&iacute;a del autom&oacute;vil o cualquier otro incumplimiento de los T&eacute;rminos y/o las Pol&iacute;ticas.<br /><br /> 3.4.&nbsp;Todos los pagos a realizar por cualquiera de las partes en virtud de este acuerdo se realizar&aacute;n sin retenci&oacute;n o compensaci&oacute;n a causa de disputas, reconvenciones o por cualquier otro motivo.<br /><br /></p>
<ol start="4">
<li><strong> RESPONSABILIDADES DEL CONDUCTOR</strong></li>
</ol>
<p>4.1 El Conductor deber&aacute; durante la vigencia de este acuerdo:</p>
<p><br /> (a) asegurarse de que el Veh&iacute;culo se opere con el debido cuidado y diligencia, y en todo momento de conformidad con la ley aplicable y las Pol&iacute;ticas y los T&eacute;rminos;</p>
<p><br /> (b) asegurarse de que el Veh&iacute;culo solo sea operado por el Conductor autorizado;</p>
<p><br /> (c) velar por que se cumplan todas las normas y reglamentos aplicables, incluidos los c&oacute;digos de circulaci&oacute;n por carretera o las normas de conducta;</p>
<p><br /> (d) mantener por su propia cuenta el Veh&iacute;culo en las mismas condiciones que a la Hora de Recogida (exceptuando &uacute;nicamente el desgaste normal, de conformidad con las P&oacute;lizas);</p>
<p><br /> (e) mantener al Propietario completamente informado de todos los asuntos importantes relacionados con el Veh&iacute;culo, incluido el cumplimiento de las Pol&iacute;ticas aplicables con respecto a la notificaci&oacute;n de cualquier accidente, da&ntilde;o o p&eacute;rdida del Veh&iacute;culo;</p>
<p><br /> (f) cumplir con todas las Pol&iacute;ticas con respecto a la recogida y entrega del Veh&iacute;culo desde y con el Propietario;</p>
<p><br /> (g) no, sin el consentimiento previo por escrito del Propietario, parte del control de (incluso con fines de reparaci&oacute;n o mantenimiento), vender u ofrecer en venta, subarrendar, subarrendar o prestar el Veh&iacute;culo o permitir la creaci&oacute;n de cualquier hipoteca, cargo, gravamen u otro derecho de garant&iacute;a con respecto al Veh&iacute;culo;</p>
<p><br /> (h) no usar el Veh&iacute;culo para ning&uacute;n uso comercial o no personal (incluido, entre otros, el uso del Veh&iacute;culo como un veh&iacute;culo de alquiler privado);</p>
<p><br /> (i) entregar el Veh&iacute;culo al final del Per&iacute;odo de Alquiler en el Lugar Designado de manera oportuna de acuerdo con las Pol&iacute;ticas, en caso contrario, se aplicar&aacute; la Pol&iacute;tica sobre devoluciones tard&iacute;as;&nbsp;y</p>
<p><br /> (j) no hacer ni permitir que se haga nada que pueda invalidar cualquier seguro aplicable en&nbsp;la Republica Dominicana o en cualquier lugar donde la Plataforma est&eacute; operativa.<br /><br /></p>
<ol start="5">
<li><strong> DECLARACIONES Y GARANT&Iacute;AS&nbsp;</strong></li>
</ol>
<p>5.1 El Propietario declara y garantiza irrevocable e incondicionalmente:</p>
<p><br /> (a) ser el propietario registrado del Veh&iacute;culo o han sido debidamente autorizados por el propietario registrado del Veh&iacute;culo para celebrar este acuerdo;</p>
<p><br /> (b) el propietario registrado del Veh&iacute;culo tiene derecho a alquilar el Veh&iacute;culo de acuerdo con este contrato;</p>
<p><br /> (c) el Veh&iacute;culo cumple con los T&eacute;rminos y Pol&iacute;ticas aplicables;</p>
<p><br /> (d) el Veh&iacute;culo est&aacute; en condiciones seguras y aptas para circular, en buenas condiciones mec&aacute;nicas y en pleno cumplimiento de todos los requisitos de ley, inspecci&oacute;n y registro aplicables;&nbsp;y</p>
<p><br /> (e) cualquier informaci&oacute;n o especificaci&oacute;n establecida en la Plataforma o proporcionada por el Propietario al Conductor con respecto al Veh&iacute;culo es completa, precisa y no enga&ntilde;osa de ninguna manera.</p>
<p><br /><br /></p>
<ol start="6">
<li><strong> LIMITACI&Oacute;N DE RESPONSABILIDAD&nbsp;</strong></li>
</ol>
<p>6.1 Sujeto a la cl&aacute;usula 6.2, ninguna de las partes ser&aacute; responsable, ya sea por contrato, agravio (incluida la negligencia), incumplimiento del deber legal o de otro modo, que surja de o en relaci&oacute;n con este acuerdo por:</p>
<p><br /> (a) p&eacute;rdida de ganancias, ventas, negocios o ingresos;</p>
<p><br /> (b) interrupci&oacute;n del negocio;</p>
<p><br /> (c) p&eacute;rdida de ahorros anticipados;</p>
<p><br /> (d) p&eacute;rdida o corrupci&oacute;n de datos o informaci&oacute;n;</p>
<p><br /> (e) costo de productos o servicios sustitutos;</p>
<p><br /> (f) p&eacute;rdida de oportunidad comercial, buena voluntad o reputaci&oacute;n;&nbsp;o</p>
<p><br /> (g) cualquier p&eacute;rdida o da&ntilde;o incidental, especial, indirecto o consecuente.<br /><br /> 6.2 Nada en este acuerdo limitar&aacute; o excluir&aacute; la responsabilidad de cualquiera de las partes por:</p>
<p><br /> (a) muerte o lesiones personales resultantes de negligencia;</p>
<p><br /> (b) fraude;&nbsp;y/o</p>
<p><br /> (c) cualquier otro asunto con respecto al cual cualquiera de las partes tenga prohibido por la ley aplicable limitar o excluir la responsabilidad.<br /><br /></p>
<p><strong>7 TERMINACI&Oacute;N&nbsp;</strong></p>
<p>7.1 Este acuerdo comenzar&aacute; con la confirmaci&oacute;n de la reserva del Veh&iacute;culo por parte del Conductor por parte del Propietario a trav&eacute;s de la Plataforma, y continuar&aacute; hasta la Hora de entrega, a menos que se rescinda antes de acuerdo con esta cl&aacute;usula 7.<br /><br /> 7.2 Una parte puede rescindir este acuerdo cancelando el viaje a trav&eacute;s de la Plataforma de acuerdo con las Pol&iacute;ticas aplicables.&nbsp;Este acuerdo terminar&aacute; con efecto inmediato despu&eacute;s de dicha cancelaci&oacute;n.&nbsp;No se puede cancelar un viaje durante el Per&iacute;odo de alquiler.<br /><br /> 7.3 Este contrato se rescindir&aacute; autom&aacute;ticamente en caso de que Rentalo Inc cancele el viaje para el que el Conductor ha acordado alquilar el Veh&iacute;culo.<br /><br /> 7.4 La terminaci&oacute;n de este acuerdo se entender&aacute; sin perjuicio de los derechos y obligaciones de las partes acumulados hasta la fecha de terminaci&oacute;n.<br /><br /> 7.5 La rescisi&oacute;n de este acuerdo no afectar&aacute; la continuaci&oacute;n en vigor de la cl&aacute;usula 7 y cualquier otra cl&aacute;usula de este acuerdo que se exprese o por su naturaleza tenga la intenci&oacute;n de continuar en vigor a pesar de la rescisi&oacute;n de este acuerdo.<br /><br /> 7.6 A la terminaci&oacute;n de este acuerdo:</p>
<p><br /> (a) el Conductor no tendr&aacute; derecho a ning&uacute;n reembolso por el Precio del viaje (en su totalidad o en parte) a menos que as&iacute; lo dispongan las Pol&iacute;ticas aplicables;&nbsp;y</p>
<p><br /> (b) cuando el Conductor haya recogido el Veh&iacute;culo del Propietario, el Conductor deber&aacute; devolver inmediatamente el Veh&iacute;culo al Propietario en la Ubicaci&oacute;n Designada de acuerdo con las Pol&iacute;ticas.<br /><br /></p>
<ol start="8">
<li><strong> DATOS PERSONALES&nbsp;</strong></li>
</ol>
<p>8.1 Cada parte reconoce que, como resultado de este acuerdo, puede obtener Datos personales de la otra parte.&nbsp;Ninguna de las partes, durante y despu&eacute;s de la terminaci&oacute;n de este acuerdo, sin el consentimiento previo por escrito de la otra parte, utilizar&aacute;, divulgar&aacute; o conservar&aacute; dichos Datos personales m&aacute;s all&aacute; de los fines contemplados por este acuerdo o fines legales.<br /><br /> 8.2 Cada parte tomar&aacute; medidas de seguridad razonables para evitar el acceso, la recopilaci&oacute;n, el uso, la divulgaci&oacute;n, la copia, la modificaci&oacute;n, la eliminaci&oacute;n o riesgos similares no autorizados con respecto a los datos personales de la otra parte.<br /><br /> 8.3 Cada parte cumplir&aacute; en todo momento con las disposiciones de la PDPA con respecto a los Datos personales de la otra parte.<br /><br /></p>
<ol start="9">
<li><strong> GENERALIDADES&nbsp;</strong></li>
</ol>
<p>9.1 Ninguna de las partes podr&aacute; ceder, novar o subcontratar ninguno de sus derechos u obligaciones en virtud del presente acuerdo.<br /><br /> 9.2 Ninguna variaci&oacute;n de este acuerdo ser&aacute; efectiva a menos que se acuerde entre las partes por escrito.<br /><br /> 9.3 La renuncia a cualquier derecho en virtud de este acuerdo se har&aacute; por escrito.&nbsp;Dicha renuncia se aplicar&aacute; &uacute;nicamente a la persona a quien se dirige la renuncia y las circunstancias por las cuales se otorga.&nbsp;Cualquier incumplimiento de cualquier disposici&oacute;n de este acuerdo no constituir&aacute; una renuncia a tal o cualquier otra disposici&oacute;n.&nbsp;A menos que se indique espec&iacute;ficamente lo contrario, los derechos y recursos derivados de este acuerdo son acumulativos y no excluyen los derechos y recursos previstos por la ley.<br /><br /> 9.4 Si alguna disposici&oacute;n de este acuerdo es o se vuelve inv&aacute;lida, ilegal o inaplicable, se considerar&aacute; modificada en la medida m&iacute;nima necesaria para que sea v&aacute;lida, legal y aplicable.&nbsp;Si tal modificaci&oacute;n no es posible, la disposici&oacute;n correspondiente se considerar&aacute; suprimida.&nbsp;Cualquier modificaci&oacute;n o eliminaci&oacute;n de una disposici&oacute;n de esta cl&aacute;usula no afectar&aacute; la validez y aplicabilidad del resto de este acuerdo.<br /><br /> 9.5 Este acuerdo y todos los documentos a los que se hace referencia en &eacute;l constituyen el acuerdo completo entre las partes y reemplazan todos los arreglos, entendimientos y acuerdos anteriores entre las partes en relaci&oacute;n con su objeto.<br /><br /> 9.6 Las partes acuerdan que, en caso de que surja una disputa en relaci&oacute;n con este acuerdo, primero deber&aacute;n presentar la disputa a Rentalo Inc para su resoluci&oacute;n y cooperar&aacute;n, de buena fe, con Rentalo Inc para resolver la disputa.<br /><br /> 9.7 Este acuerdo se rige y ser&aacute; interpretado de acuerdo con las leyes de la Republica Dominicana.&nbsp;Sujeto a la cl&aacute;usula 9.6, cada una de las partes se somete a la jurisdicci&oacute;n exclusiva de los tribunales de Santiago de los Caballeros, municipio y provincia de Santiago, Republica Dominicana, con respecto a cualquier reclamo o asunto que surja de este acuerdo.</p>

              
              
            


            </div>
          </div>
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSideNavigation>
    </Page >
  );
};

const { bool } = PropTypes;

RentalPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  return {
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const RentalPage = compose(connect(mapStateToProps), injectIntl)(RentalPageComponent);

export default RentalPage;
