/// <reference types="cypress" />

it('clicks', () => {
  cy.visit('pages/no-delay-stop-propagation.html')
  cy.document().then(doc =>
    doc.addEventListener('click', cy.stub().as('click'))
  )
  cy.get('#btn').click()
  cy.get('@click').should('not.be.called')
})

it('clicks and propagates', () => {
  cy.visit('pages/no-delay.html')

  const click = e => {
    console.log('event', e)
    console.log('event path', e.path.map(el => el.localName))
  }
  cy.document().then(doc => {
    doc.addEventListener('click', cy.spy(click).as('click'))
  })
  cy.get('#btn').click()
  cy.get('@click').should('be.calledOnce')
})
