/*
 * Marketplace specific configuration.
 *
 * Every filter needs to have following keys:
 * - id:     Unique id of the filter.
 * - label:  The default label of the filter.
 * - type:   String that represents one of the existing filter components:
 *           BookingDateRangeFilter, KeywordFilter, PriceFilter,
 *           SelectSingleFilter, SelectMultipleFilter.
 * - group:  Is this 'primary' or 'secondary' filter?
 *           Primary filters are visible on desktop layout by default.
 *           Secondary filters are behind "More filters" button.
 *           Read more from src/containers/SearchPage/README.md
 * - queryParamNames: Describes parameters to be used with queries
 *                    (e.g. 'price' or 'pub_amenities'). Most of these are
 *                    the same between webapp URLs and API query params.
 *                    You can't change 'dates', 'price', or 'keywords'
 *                    since those filters are fixed to a specific attribute.
 * - config: Extra configuration that the filter component needs.
 *
 * Note 1: Labels could be tied to translation file
 *         by importing FormattedMessage:
 *         <FormattedMessage id="some.translation.key.here" />
 *
 * Note 2: If you need to add new custom filter components,
 *         you need to take those into use in:
 *         src/containers/SearchPage/FilterComponent.js
 *
 * Note 3: If you just want to create more enum filters
 *         (i.e. SelectSingleFilter, SelectMultipleFilter),
 *         you can just add more configurations with those filter types
 *         and tie them with correct extended data key
 *         (i.e. pub_<key> or meta_<key>).
 */

export const filters = [
  {
    id: 'dates',
    label: 'Fechas',
    type: 'BookingDateRangeFilter',
    group: 'primary',
    // Note: BookingDateRangeFilter is fixed filter,
    // you can't change "queryParamNames: ['dates'],"
    queryParamNames: ['dates'],
    config: {},
  },
  {
    id: 'price',
    label: 'Precio',
    type: 'PriceFilter',
    group: 'primary',
    // Note: PriceFilter is fixed filter,
    // you can't change "queryParamNames: ['price'],"
    queryParamNames: ['price'],
    // Price filter configuration
    // Note: unlike most prices this is not handled in subunits
    config: {
      min: 0,
      max: 1000,
      step: 5,
    },
  },
  {
    id: 'keyword',
    label: 'Palabra clave',
    type: 'KeywordFilter',
    group: 'primary',
    // Note: KeywordFilter is fixed filter,
    // you can't change "queryParamNames: ['keywords'],"
    queryParamNames: ['keywords'],
    // NOTE: If you are ordering search results by distance
    // the keyword search can't be used at the same time.
    // You can turn on/off ordering by distance from config.js file.
    config: {},
  },
  {
    id: 'category',
    label: 'Vehicle type',
    type: 'SelectSingleFilter',
    group: 'secondary',
    queryParamNames: ['pub_category'],
    config: {
      options: [
        { key: 'adventures', label: 'Aventura' },
        { key: 'economic', label: 'Económico' },
        { key: 'compact', label: 'Compacto' },
        { key: 'executives', label: 'Ejecutivo' },
        { key: 'family', label: 'Familiar' },
        // { key: 'electrical', label: 'Eléctrico' },
        // { key: 'trucks', label: 'Camiones' },
      ],
    },
  },
  {
    id: 'delivery',
    label: 'Delivery',
    type: 'SelectSingleFilter',
    group: 'primary',
    queryParamNames: ['pub_delivery'],
    config: {
      options: [
        { key: 'yes', label: 'Delivery' },
      ],
    },
  },

  {
    id: 'instantBooking',
    label: 'Reserva instantánea',
    type: 'SelectSingleFilter',
    group: 'primary',
    queryParamNames: ['pub_instantBooking'],
    config: {
      options: [
        { key: 'yes', label: 'Reserva instantánea' },

      ],
    },
  },

  {
    id: 'amenities',
    label: 'Amenities',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_amenities'],
    config: {
      searchMode: 'has_all',
      options: [
        {
          key: 'auxInput',
          label: 'Entrada auxiliar',
        },
        {
          key: 'childSeat',
          label: 'Asiento para niños',
        },
        {
          key: 'cruiseControl',
          label: 'Cruise Control',
        },
        {
          key: 'gps',
          label: 'GPS',
        },
        {
          key: 'rearCamera',
          label: 'Cámara trasera',
        },
        {
          key: 'sunRoof',
          label: 'Sun roof',
        },
        {
          key: 'carPlay',
          label: 'Car play',
        },
        {
          key: 'bluetooth',
          label: 'Bluetooth',
        },
        {
          key: 'usbInput',
          label: 'Entrada USB',
        },
        {
          key: 'android',
          label: 'Android',
        }
      ],
    },
  },

  {
    id: 'carrules',
    label: 'Car Rules',
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_carrules'],
    config: {
      searchMode: 'has_all',
      options: [
        {
          key: 'no_pet',
          label: 'Sin mascotas',
        },
        {
          key: 'no_smoke',
          label: 'Sin fumar',
        },
        {
          key: 'no_outside',
          label: 'No usar fuera de la ciudad',
        }
      ],
    },
  },
];

export const transmission = [
  { key: 'automatic', label: 'Automático' },
  { key: 'manual', label: 'Manual' },
];

export const minimumTripDays = [
  { key: '1', label: '1' },
  { key: '2', label: '2' },
  { key: '3', label: '3' },
  { key: '4', label: '4' },
  { key: '5', label: '5' },
  { key: '6', label: '6' },
  { key: '7', label: '7' },
  { key: '8', label: '8' },
  { key: '9', label: '9' },
  { key: '10', label: '10' },
];

export const maximumTripDays = [
  { key: '11', label: '11' },
  { key: '12', label: '12' },
  { key: '13', label: '13' },
  { key: '14', label: '14' },
  { key: '15', label: '15' },
  { key: '16', label: '16' },
  { key: '17', label: '17' },
  { key: '18', label: '18' },
  { key: '19', label: '19' },
  { key: '20', label: '20' },
  { key: '21', label: '21' },
  { key: '22', label: '22' },
  { key: '23', label: '23' },
  { key: '24', label: '24' },
  { key: '25', label: '25' },
  { key: '26', label: '26' },
  { key: '27', label: '27' },
  { key: '28', label: '28' },
  { key: '29', label: '29' },
  { key: '30', label: '30' },
];

export const fuel = [
  { key: 'diesel', label: 'Diésel' },
  { key: 'gasoline', label: 'Gasolina' },
  { key: 'electric', label: 'Híbrido' },
  { key: 'gas', label: 'Gas' },
  // { key: 'hybrid', label: 'Eléctrico' },
];

export const make = [
  { key: 'maruti_Suzuki', label: 'MARUTI SUZUKI' },
  { key: 'hyundai', label: 'HYUNDAI' },
  { key: 'tata', label: 'TATA' },
  { key: 'kia', label: 'KIA' },
  { key: 'mitsubishi', label: 'MITSUBISHI' },

  { key: 'mahindra', label: 'MAHINDRA' },
  { key: 'toyota', label: 'TOYOTA' },
  { key: 'ford', label: 'FORD' },
  { key: 'mercedes-Benz', label: 'MERCEDES-BENZ' },
  { key: 'bmw', label: 'BMW' },
];

export const model = [
  { key: 'corolla', label: 'COROLLA' },
  { key: 'k5', label: 'K5' },
  { key: 'montero"', label: 'MONTERO' },
  { key: 'montero_sport', label: 'MONTERO SPORT' },
  { key: 'spectra_sx', label: 'SPECTRA SX' },

  { key: 'sonata', label: 'SONATA' },
  { key: 'innova', label: 'INNOVA' },
  { key: 'nexon', label: 'NEXON' },
  { key: 'tiago', label: 'TIAGO' },
  { key: 'swift', label: 'SWIFT' },
  { key: 'x1', label: 'X1' },
  { key: 'c_class', label: 'C-ClASS' },
  { key: 'F150 XLT 4X4', label: 'F150 XLT 4X4' },
];
export const sortConfig = {
  // Enable/disable the sorting control in the SearchPage
  active: true,

  // Note: queryParamName 'sort' is fixed,
  // you can't change it since Flex API expects it to be named as 'sort'
  queryParamName: 'sort',

  // Internal key for the relevance option, see notes below.
  relevanceKey: 'relevance',

  // Keyword filter is sorting the results already by relevance.
  // If keyword filter is active, we need to disable sorting.
  conflictingFilters: ['keyword'],

  options: [
    { key: 'createdAt', label: 'Newest' },
    { key: '-createdAt', label: 'Oldest' },
    { key: '-price', label: 'Lowest price' },
    { key: 'price', label: 'Highest price' },

    // The relevance is only used for keyword search, but the
    // parameter isn't sent to the Marketplace API. The key is purely
    // for handling the internal state of the sorting dropdown.
    { key: 'relevance', label: 'Relevance', longLabel: 'Relevance (Keyword search)' },
  ],
};

export const bankNames = [
  { key: 'bhd', label: 'Banco BHD León' },
  { key: 'reservas', label: 'Banco Reservas' },
  { key: 'dominicano', label: 'Banco Popular Dominicano' },
  { key: 'santacruz', label: 'Banco Santa Cruz' },
  { key: 'benseco', label: 'Banesco' },
  { key: 'scotiabank', label: 'Scotiabank' },
  { key: 'cibao', label: 'Asociación Cibao De Ahorros Y Prestamos' },
  { key: 'duarte', label: 'Asociación Duarte de Ahorros y Préstamos' },
  { key: 'nacional', label: 'Asociación La Nacional de Ahorros y Préstamos' },
  { key: 'caribe', label: 'Banco Caribe' },
  { key: 'progreso', label: 'Banco del Progreso' },
];

export const PROFILE = 'profile';
export const CONTACT = 'contact';
export const MATI = 'mati';
export const PAYMENT = 'payment';
export const TYPE = 'type';
export const COMPLETE = 'complete';
export const BANK = 'bank';

export const driverSteps = [PROFILE, CONTACT, MATI, PAYMENT];
export const hostSteps = [PROFILE, CONTACT, TYPE, MATI, BANK];

export const verification = [
  {
    key: 'verified',
    msg: 'Tu verificación está completa',
  },
  {
    key: 'running',
    msg: 'Tu verificación se está ejecutando por favor espere',
  },
  {
    key: 'pending',
    msg: 'Su estado de verificación se está ejecutando, por favor espere',
  },
  {
    key: 'reviewNeeded',
    msg: 'Your verification is needed reviewed by Owner',
  },
  {
    key: 'rejected',
    msg: 'Su verificación ha sido rechazada. Si usted cree que esto es un error, por favor contacte soporte al cliente.',
  },
];


export const workTypes =[
  {key:'employee/salaried' , label:'Empleado con salario'},
  {key:'owner/partner' ,     label:'Propietario/Socio'},
  {key:'retired/pensioner' , label:'Jubilado/Pensionado'},
  {key:'investor/lender' ,   label:'Inversor/Prestamista'},
  {key:'self-employed' ,     label:'Trabajador autónomo'},
  {key:'student ' ,          label:'Estudiante'},
  {key:'homemaker' ,         label:'Ama de casa'},
  {key:'Other' ,             label:'Otro'},
]