import React from 'react';
import { shallow } from 'enzyme';
import SearchField from '../../components/Home/SearchField';

describe('SearchField Component', () => {
  const props = {
    value: '',
    onChange: jest.fn(),
    onVendorFilterChange: jest.fn(),
    shops: [],
    shopFilter: null
  }

  const wrapper = shallow(<SearchField {...props} />);

  describe('Intial state for component', () => {
    it('filter button is rendered', () => {
      expect(wrapper.find('button').length).toBe(1);
    });
  });
});
