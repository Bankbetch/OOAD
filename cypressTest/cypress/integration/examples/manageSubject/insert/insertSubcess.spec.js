describe('manageSubject', function() {

    it('insertSubcess', function() {
    
       cy.visit('http://localhost:4200/login')

       cy.get('.card-body > .p-5 > .user > .form-group > #username').click()
       cy.get('.card-body > .p-5 > .user > .form-group > #username').type('admin')
       cy.get('.card-body > .p-5 > .user > .form-group > #password').type('12345678')
       cy.get('.card-body > .p-5 > .user > .form-group > .btn').click()

       cy.get('.wrapper > #sidebar > .list-unstyled > .nav-item:nth-child(2) > .dropdown-toggle').click()
       cy.get('#sidebar > .list-unstyled > .nav-item > #menuStaff > .dropdown-toggle').click()
       cy.get('.nav-item > #menuStaff > #manageSubject > li > .nav-link').click()
       cy.get('#content > app-manage-exam > .container > .row > .btn:nth-child(5)').click()
      

       cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > form.ng-untouched > :nth-child(1) > :nth-child(1) > .form-group > .form-control').select('88621359')
       cy.get('.dropdown-btn').click()
       cy.get('.multiselect-item-checkbox > div').click()
       cy.get('.dropdown-btn').click()
       cy.get(':nth-child(4) > :nth-child(2) > .form-group > .form-control').select('วิทยาการสารสนเทศ')
       cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-invalid.ng-dirty > :nth-child(5) > :nth-child(1) > .form-group > .form-control').select('5t-03')
       cy.get(':nth-child(6) > :nth-child(2) > .form-control').select('ภาคการศึกษาต้น')
       cy.get(':nth-child(7) > :nth-child(1) > .form-group > .form-control').select('จันทร์')
       cy.get('.ng-invalid > .row > .col > .form-group > .ng-invalid').select('10.00')
       cy.get('.ng-invalid > .row > .col > .form-group > .ng-invalid').select('12.55')
       cy.get('.modal-content > .modal-body > .ng-invalid > .modal-footer > .btn-success').click()
      
    })
   
   })
   