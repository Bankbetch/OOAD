describe('test_name', function() {

    it('delete', function() {
        
       cy.visit('http://localhost:4200/')
       cy.get('.card-body > .p-5 > .user > .form-group > #username').click()
       cy.get('.card-body > .p-5 > .user > .form-group > #username').type('admin')
       cy.get('.card-body > .p-5 > .user > .form-group > #password').type('12345678')
       cy.get('.card-body > .p-5 > .user > .form-group > .btn').click()

       cy.get('.wrapper > #sidebar > .list-unstyled > .nav-item:nth-child(2) > .dropdown-toggle').click()
       cy.get('#sidebar > .list-unstyled > .nav-item > #menuStaff > .dropdown-toggle').click()
       cy.get('.nav-item > #menuStaff > #manageSubject > li:nth-child(2) > a').click()

       cy.get(':nth-child(1) > :nth-child(1) > label > input').click()
       cy.get('.btn-outline-danger').click()
       cy.get('tr:nth-child(1) > #modalDelete > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()
       
    
    })
   
   })
   