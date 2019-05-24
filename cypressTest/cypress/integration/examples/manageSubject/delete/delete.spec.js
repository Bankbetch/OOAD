describe('manageSubject', function() {

    it('delete', function() {
    
       cy.visit('http://localhost:4200/login')

       cy.get('.card-body > .p-5 > .user > .form-group > #username').click()
       cy.get('.card-body > .p-5 > .user > .form-group > #username').type('admin')
       cy.get('.card-body > .p-5 > .user > .form-group > #password').type('12345678')
       cy.get('.card-body > .p-5 > .user > .form-group > .btn').click()

       cy.get('.wrapper > #sidebar > .list-unstyled > .nav-item:nth-child(2) > .dropdown-toggle').click()
       cy.get('#sidebar > .list-unstyled > .nav-item > #menuStaff > .dropdown-toggle').click()
       cy.get('.nav-item > #menuStaff > #manageSubject > li > .nav-link').click()
       cy.get('.input-group > .form-control').click()
       cy.get('.input-group > .form-control').type('web progarmming')

       cy.get('label > input').click()
       cy.get('.btn-outline-danger').click()
       cy.get('.modal-footer > .btn-primary').click()
    })
   
   })
   