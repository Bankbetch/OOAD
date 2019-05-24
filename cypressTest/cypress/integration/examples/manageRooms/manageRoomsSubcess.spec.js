describe('manageRooms', () => {

    it('host', () => {
        cy.visit('http://localhost:4200/')
    })

    it('login', () =>{
        cy.get('input[name=username]').type("admin")
        cy.get('input[name=password]').type("12345678")
        cy.get(':nth-child(4) > .btn').click()
    })

    it('clickManageRooms', () => {
        cy.get('.wrapper > #sidebar > .list-unstyled > .nav-item:nth-child(2) > .dropdown-toggle').click()
        cy.get('#sidebar > .list-unstyled > .nav-item > #menuStaff > .dropdown-toggle').click()
        cy.get('.nav-item > #menuStaff > #manageSubject > li:nth-child(4) > a').click()
        cy.get('.container > .row > .col > .btn-outline-success > .fa').click()
       
    })

     it('insert', () => {
        cy.get('#exampleModal > .modal-dialog > .modal-content > .modal-body > form.ng-untouched > :nth-child(1) > .form-control').select('วิทยาการสารสนเทศ')
        cy.get('#exampleModal > .modal-dialog > .modal-content > .modal-body > .ng-invalid.ng-dirty > :nth-child(2) > :nth-child(1) > .form-group > .form-control').type('5t-03')
        cy.get('#exampleModal > .modal-dialog > .modal-content > .modal-body > .ng-invalid.ng-touched > :nth-child(3) > :nth-child(1) > .form-group > .form-control').type('10')
        cy.get('#exampleModal > .modal-dialog > .modal-content > .modal-body > .ng-invalid.ng-touched > :nth-child(3) > :nth-child(2) > .form-group > .form-control').type('6')
        cy.get('.modal-content > .modal-footer > .btn-success').click()
    })
})