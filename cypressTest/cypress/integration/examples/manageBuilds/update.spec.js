describe('manageBuilds', () => {

    it('host', () => {
        cy.visit('http://localhost:4200/')
    })

    it('login', () =>{
        cy.get('input[name=username]').type("admin")
        cy.get('input[name=password]').type("12345678")
        cy.get(':nth-child(4) > .btn').click()
    })

    it('clickManageBuilds', () => {
        cy.get('[href="#menuStaff"]').click()
        cy.get('#menuStaff > :nth-child(3) > a').click()
        cy.get('#menuStaff > .dropdown-toggle').click()
        cy.get(':nth-child(5) > a').click()
    })

    

    it('update', () => {
        cy.get(':nth-child(4) > .btn').click()
        cy.get('#exampleModal3 > .modal-dialog > .modal-content > .modal-body > form.ng-untouched > :nth-child(1) > .form-control').clear()
        cy.get('#exampleModal3 > .modal-dialog > .modal-content > .modal-body > form.ng-untouched > :nth-child(1) > .form-control').type('com-sci')
        cy.get('#exampleModal3 > .modal-dialog > .modal-content > .modal-body > form.ng-dirty > .modal-footer > .btn-success').click()
    })
    
    
})