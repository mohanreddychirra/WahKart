import React from 'react';
import { shallow } from 'enzyme';
import mockStore from '../../store';
import { shops } from '../../__mocks__/shops';
import FilterModal from '../../../components/Modal/FilterModal';

const render = (newState={}) => {
  const store = mockStore({
    shopReducer: {
      shops: [ ...(newState.shops || []) ]
    },
    productReducer: {
      products: []
    },
    modalReducer: {
      productFilter: {
        min: null,
        max: null,
        shopIds: []
      },
    }
  });

  return shallow(
    <FilterModal store={store} />
  ).dive();
}

describe('FilterModal Component', () => {  
  it ('renders the filter modal', () => {
    const wrapper = render();
    expect(wrapper.length).toBe(1)
  });

  it ('renders two shops on the filter', () => {
    const wrapper = render({ shops: [ ...shops ] });
    const found = wrapper.find('#shop-listing').find('.one-shop-listing');
    expect(found.length).toBe(2);
  });

  it ('has the min and max input fields', () => {
    const wrapper = render();
    expect(wrapper.find('input[type="text"]').length).toBe(2);
  });
});
