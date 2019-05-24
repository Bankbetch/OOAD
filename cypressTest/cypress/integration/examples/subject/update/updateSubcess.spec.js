describe('test_name', function() {

    it('what_it_does', function() {
   
       cy.visit('http://localhost:4200/login')

       cy.get('.card-body > .p-5 > .user > .form-group > #username').click()
       cy.get('.card-body > .p-5 > .user > .form-group > #username').type('admin')
       cy.get('.card-body > .p-5 > .user > .form-group > #password').type('12345678')
       cy.get('.card-body > .p-5 > .user > .form-group > .btn').click()
    
       cy.get('.wrapper > #sidebar > .list-unstyled > .nav-item:nth-child(2) > .dropdown-toggle').click()
       cy.get('#sidebar > .list-unstyled > .nav-item > #menuStaff > .dropdown-toggle').click()
       cy.get('.nav-item > #menuStaff > #manageSubject > li:nth-child(2) > a').click()
       cy.get('tbody > tr:nth-child(1) > td > .btn > .fa').click()

       cy.get('.table-responsive > .table > tbody > tr:nth-child(1) > #modalEdit').click()
       cy.get('tr:nth-child(1) > #modalEdit > .modal-dialog > .modal-content > .modal-body > .ng-untouched > .row:nth-child(1) > .col:nth-child(1) > .form-group > .form-control').clear()
       cy.get('tr:nth-child(1) > #modalEdit > .modal-dialog > .modal-content > .modal-body > .ng-untouched > .row:nth-child(1) > .col:nth-child(1) > .form-group > .form-control').type('88624459')

       cy.get('.table-responsive > .table > tbody > tr:nth-child(1) > #modalEdit').click()
       cy.get('tr:nth-child(1) > #modalEdit > .modal-dialog > .modal-content > .modal-body > .ng-valid > .row:nth-child(1) > .col:nth-child(2) > .form-group > .form-control').clear()
       cy.get(':nth-child(1) > #modalEdit > .modal-dialog > .modal-content > .modal-body > form.ng-dirty > :nth-child(1) > :nth-child(2) > .form-group > .form-control').type('Progarmming')
       cy.get('tr:nth-child(1) > #modalEdit > .modal-dialog > .modal-content > .modal-body > .ng-valid > .modal-footer > .btn:nth-child(1)').click()
       cy.get('tr:nth-child(1) > #modalEdit > .modal-dialog > .modal-content > .modal-body > .ng-valid > .modal-footer > #CloseEdit').click()
    
    })
   
   })
   