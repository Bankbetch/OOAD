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
        cy.get('#menuStaff > .dropdown-toggle').click()
        cy.get('#manageSubject > :nth-child(5) > a').click()
    })

    it('insert', () => {
        cy.get('.btn-outline-success').click()
        cy.get('#exampleModal > .modal-dialog > .modal-content > .modal-body > form.ng-untouched > :nth-child(1) > .form-control').type('วิศวกรรมศาสตร์')
        cy.get('#exampleModal > .modal-dialog > .modal-content > .modal-body > .ng-invalid.ng-dirty > :nth-child(2) > .form-control').type('300')
        cy.get('#exampleModal > .modal-dialog > .modal-content > .modal-body > form.ng-dirty > .modal-footer > .btn-success').click()
    })

})