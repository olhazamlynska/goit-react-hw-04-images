import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  SearchBar,
  FormSearch,
  Btn,
  BtnLabel,
  Input,
  Icon,
} from 'components/Searchbar/SearchBar.styled';

import * as Yup from 'yup';

const initialValues = { query: '' };

const sсhema = Yup.object().shape({
  query: Yup.string().required('Name is required field.'),
});

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = ({ query }, { resetForm }) => {
    onSubmit(query);

    resetForm();
  };

  return (
    <SearchBar>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={sсhema}
      >
        <FormSearch>
          <Btn type="submit">
            <Icon />
            <BtnLabel>Search</BtnLabel>
          </Btn>

          <Input
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </FormSearch>
      </Formik>
    </SearchBar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
