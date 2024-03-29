import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterUse } from '../../redux/filter/filterSlice';
import sprite from '../../images/sprite.svg';
import {
  Form,
  LocationLabel,
  Text,
  Title,
  Wrap,
  WrapContent,
  Filterbutton,
  SearchButton,
} from './SearchForm.styled';

const SearchForm = () => {
  const dispatch = useDispatch();

  const [location, setLocation] = useState('');
  const [details, setDetails] = useState({
    airConditioner: false,
    automatic: false,
    kitchen: false,
    TV: false,
    shower: false,
  });
  const [forms, setForms] = useState('');

  const handleFilterAdverts = event => {
    event.preventDefault();
    dispatch(filterUse({ location, details, forms }));
  };

  const filtersEquipment = [
    {
      value: 'airConditioner',
      icon: 'icon-AC',
      text: 'AC',
    },
    {
      value: 'automatic',
      icon: 'icon-automatic',
      text: 'Automatic',
    },
    {
      value: 'kitchen',
      icon: 'icon-kitchen',
      text: 'Kitchen',
    },
    {
      value: 'TV',
      icon: 'icon-TV',
      text: 'TV',
    },
    {
      value: 'shower',
      icon: 'icon-shower',
      text: 'Shower/WC',
    },
  ];

  const filtersType = [
    {
      value: 'panelTruck',
      icon: 'icon-van',
      text: 'Van',
    },
    {
      value: 'fullyIntegrated',
      icon: 'icon-fully-integrated',
      text: 'Fully Integrated',
    },
    {
      value: 'alcove',
      icon: 'icon-alcove',
      text: 'Alcove',
    },
  ];

  const handleLocation = event => {
    const { value } = event.target;
    setLocation(value);
  };

  const handleCheckbox = event => {
    const { value, checked } = event.target;
    setDetails({ ...details, [value]: checked });
  };

  const handleRadio = event => {
    const { value } = event.target;
    setForms(value);
  };

  return (
    <Form onSubmit={handleFilterAdverts}>
      <LocationLabel>
        Location
        <svg>
          <use href={`${sprite}#icon-map-pin`} />
        </svg>
        <input
          type="text"
          name="location"
          value={location}
          placeholder="City"
          onChange={handleLocation}
        />
      </LocationLabel>

      <Text>Filters</Text>

      <Title>Vehicle equipment</Title>
      <hr />
      <Wrap>
        {filtersEquipment.map(({ value, icon, text }) => (
          <WrapContent key={value}>
            <input
              type="checkbox"
              name={value}
              value={value}
              checked={details[value]}
              onChange={handleCheckbox}
            />
            <Filterbutton>
              <svg width="32" height="32" fill="none" stroke="currentColor">
                <use href={`${sprite}#${icon}`} />
              </svg>
              {text}
            </Filterbutton>
          </WrapContent>
        ))}
      </Wrap>

      <Title>Vehicle type</Title>
      <hr />
      <Wrap>
        {filtersType.map(({ value, icon, text }) => (
          <WrapContent key={value}>
            <input
              type="radio"
              name="vehicleType"
              value={value}
              checked={forms === value}
              onChange={handleRadio}
            />
            <Filterbutton>
              <svg width="40" height="28" fill="none" stroke="currentColor">
                <use href={`${sprite}#${icon}`} />
              </svg>
              {text}
            </Filterbutton>
          </WrapContent>
        ))}
      </Wrap>
      <SearchButton type="submit">Search</SearchButton>
    </Form>
  );
};

export default SearchForm;
