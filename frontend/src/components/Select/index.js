import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function SelectComponent({
  label,
  placeholder,
  name,
  options,
  onChange,
  defaultValue,
}) {
  const customStyles = {
    control: () => ({
      display: 'flex',
      border: '1px solid #ccc',
      borderRadius: 4,
      height: 45,
      width: '100%',
      padding: '0 7px',
      color: '#999',
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#fff' : '#999',
      padding: 10,
    }),
    singleValue: (provided) => {
      const color = '#999';
      return { ...provided, color };
    },
  };

  return (
    <Container>
      <strong>{label}</strong>
      <Select
        name={name}
        styles={customStyles}
        isSearchable={false}
        options={options}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </Container>
  );
}

SelectComponent.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};
