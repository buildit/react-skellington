import React from 'react'

import { expect } from 'chai'
import { shallow, mount, render } from 'enzyme'

import App from '../src/containers/App'

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(shallow(<App />).contains(<div className="site-wrapper" />)).to.equal(true)
  })

  it("contains spec with an expectation", function() {
    expect(shallow(<App />).is('.App')).to.equal(true)
  })

  it("contains spec with an expectation", function() {
    expect(mount(<App />).find('.foo').length).to.equal(1)
  })
})
