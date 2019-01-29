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
    it('select field is rendered', () => {
      expect(wrapper.find('#vendor-filter').length).toBe(1);
    });

    it('value on select field is an empty string', () => {
      const selectField = wrapper.find('#vendor-filter');
      expect(selectField.prop('value')).toBe('');
    });

    it('no shops are added as options', () => {
      const selectField = wrapper.find('#vendor-filter');
      expect(selectField.find('select').find('option').length).toBe(1);
    });
  });

  describe('Updating Props for components', () => {
    it ('should render a single shop option', () => {
      wrapper.setProps({
        shops: [
          {
            id: 1,
            vendorId: 1,
            name: 'Test Shop',
            location: 'Chicago US'
          }
        ]
      });

      const selectField = wrapper.find('#vendor-filter');
      expect(selectField.find('select').find('option').length).toBe(2);
    });
  });
});
