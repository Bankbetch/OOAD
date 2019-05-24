describe('exam', function() {

    it('insert', function() {
   
       cy.visit('http://localhost:4200/login')
       cy.get('.card-body > .p-5 > .user > .form-group > #username').click()
       cy.get('.card-body > .p-5 > .user > .form-group > #username').type('admin')
       cy.get('.card-body > .p-5 > .user > .form-group > #password').type('12345678')
       cy.get('.card-body > .p-5 > .user > .form-group > .btn').click()
    
       cy.get('.wrapper > #sidebar > .list-unstyled > .nav-item:nth-child(2) > .dropdown-toggle').click()
       cy.get('#sidebar > .list-unstyled > .nav-item > #menuStaff > .dropdown-toggle').click()
       cy.get('.nav-item > #menuStaff > #manageSubject > li:nth-child(3) > a').click()
       cy.get('#content > app-manage-test > .container > .row > #insertEx').click()      
       cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-untouched > .row:nth-child(1) > .col:nth-child(1) > .form-group > .form-control').select('88621359')
       cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-dirty.ng-invalid > :nth-child(3) > :nth-child(2) > .form-group > .form-control').select('กลางภาค')
       //cy.get(':nth-child(4) > :nth-child(1) > .form-group > .form-control').click()
       cy.get(':nth-child(4) > :nth-child(1) > .form-group > .form-control').type('2019-05-02')
       cy.get(':nth-child(4) > :nth-child(2) > .form-group > #timeStart').select('8:00')
       cy.get(':nth-child(4) > :nth-child(3) > .form-group > #timeEnd').select('11:55')
       cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-invalid > .modal-footer > .btn-success').click()
       
    
    })
   
   })
   