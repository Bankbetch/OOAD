describe('manageSubject', function() {

    it('updateSubcess', function() {
    
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

       cy.get('.btn-warning').click()
       cy.get(':nth-child(3) > :nth-child(2) > .form-group > .form-control').select('วิศวกรรมศาสตร์')
       cy.get('#modalEdit > .modal-dialog > .modal-content > .modal-body > .ng-invalid.ng-dirty > :nth-child(4) > :nth-child(1) > .form-group > .form-control').select('3a')
       cy.get('#modalEdit > .modal-dialog > .modal-content > .modal-body > .ng-invalid.ng-dirty > :nth-child(6) > :nth-child(1) > .form-group > .form-control').select('พุธ')
       cy.get(':nth-child(6) > :nth-child(2) > .form-group > .form-control').select('13.00')
       cy.get(':nth-child(6) > :nth-child(3) > .form-group > .form-control').select('14.55')
       cy.get('#modalEdit > .modal-dialog > .modal-content > .modal-body > .ng-invalid > .modal-footer > .btn-success').click()
    })
   
   })
   