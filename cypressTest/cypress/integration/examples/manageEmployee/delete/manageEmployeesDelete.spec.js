describe('login', function() {

    it('Delete', function() {
       cy.visit('http://localhost:4200/')
       cy.get('.card-body > .p-5 > .user > .form-group > #username').click()
       cy.get('.card-body > .p-5 > .user > .form-group > #username').type('admin')
       cy.get('.card-body > .p-5 > .user > .form-group > #password').type('12345678')
       cy.get('.card-body > .p-5 > .user > .form-group > .btn').click()
       cy.get('.wrapper > #sidebar > .list-unstyled > .nav-item:nth-child(2) > .dropdown-toggle').click()
       cy.get('.list-unstyled > .nav-item > #menuStaff > li > a').click()
       cy.get('.input-group > .form-control').type("non")
       cy.wait(500)
       cy.get('label > input').click()
       cy.get('.btn-outline-danger').click()
       cy.get('.modal-content > .modal-footer > .btn-primary').click()
    })
   
   })
   