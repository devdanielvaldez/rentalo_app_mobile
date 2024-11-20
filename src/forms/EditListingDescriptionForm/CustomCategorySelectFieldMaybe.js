// import React from 'react';
// import { required } from '../../util/validators';
// import { FieldSelect } from '../../components';

// import css from './EditListingDetailsForm.module.css';

// const CustomCategorySelectFieldMaybe = props => {
//   const { name, id, categories, intl, label, placeholder, requiredMessage } = props;
//   const categoryLabel =
//     label ??
//     intl.formatMessage({
//       id: 'EditListingDescriptionForm.categoryLabel',
//     });
//   const categoryPlaceholder =
//     placeholder ??
//     intl.formatMessage({
//       id: 'EditListingDescriptionForm.categoryPlaceholder',
//     });
//   const categoryRequired = required(
//     requiredMessage ??
//       intl.formatMessage({
//         id: 'EditListingDescriptionForm.categoryRequired',
//       })
//   );
//   return categories ? (
//     <FieldSelect
//       className={css.category}
//       name={name}
//       id={id}
//       label={categoryLabel}
//       validate={categoryRequired}
//     >
//       <option disabled value="">
//         {categoryPlaceholder}
//       </option>
//       {categories.map(c => (
//         <option key={c.key} value={c.key}>
//           {c.label}
//         </option>
//       ))}
//     </FieldSelect>
//   ) : null;
// };

// export default CustomCategorySelectFieldMaybe;
