import React from 'react'

import sinon from 'sinon'

import { expect } from 'chai'
import { shallow } from 'enzyme'

import CounterView from '../src/components/CounterView'

describe('<CounterView />', () => {
  const props = {
    value: 3,
    onIncrement: sinon.spy(),
    onDecrement: sinon.spy(),
  }

  it('renders a single <CounterView /> component', () => {
    const wrapper = shallow(<div><CounterView { ...props } /></div>)
    expect(wrapper.find(CounterView)).to.have.length(1)
  })

  it('simulates click events', () => {
    const wrapper = shallow(<CounterView { ...props } />)
    const { onIncrement, onDecrement } = props

    wrapper.find('button').first().simulate('click')
    wrapper.find('button').last().simulate('click')
    expect(onIncrement).to.have.property('callCount', 1)
    expect(onDecrement).to.have.property('callCount', 1)
  })

})
