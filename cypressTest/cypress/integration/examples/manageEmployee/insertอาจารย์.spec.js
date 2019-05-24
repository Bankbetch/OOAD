describe('manageEmployee', function() {

    it('insertอาจารย์', function() {
    
       cy.visit('http://localhost:4200/login')
    
       cy.get('.card-body > .p-5 > .user > .form-group > #username').click()
       cy.get('.card-body > .p-5 > .user > .form-group > #username').type('admin')
       cy.get('.card-body > .p-5 > .user > .form-group > #password').type('12345678')
       cy.get('.card-body > .p-5 > .user > .form-group > .btn').click()
    
       cy.get('.wrapper > #sidebar > .list-unstyled > .nav-item:nth-child(2) > .dropdown-toggle').click()
       cy.get('#sidebar > .list-unstyled > .nav-item > #menuStaff > .dropdown-toggle').click()
       cy.get('.list-unstyled > .nav-item > #menuStaff > li > a').click()
       cy.get('.container > .row > .col > .btn-outline-success > .fa').click()
       cy.get('.modal-content > .modal-body > .ng-untouched > .modal-footer > #closeModal').click()
       cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-untouched > .row > .col > .form-group:nth-child(1) > .col-sm-9 > .form-control').click()
       cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-untouched > .row > .col > .form-group:nth-child(1) > .col-sm-9 > .form-control').type('test')
       cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-dirty > .row > .col > .form-group:nth-child(2) > .col-sm-9 > .form-control').click()
       cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-dirty > .row > .col > .form-group:nth-child(2) > .col-sm-9 > .form-control').type('test')
       cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-dirty > .row > .col > .form-group:nth-child(3) > .col-sm-9 > .form-control').click()
       cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-dirty > .row > .col > .form-group:nth-child(3) > .col-sm-9 > .form-control').type('test')
       cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-dirty.ng-invalid.ng-touched > :nth-child(1) > .col > :nth-child(4) > .col-sm-9 > .form-control').click()
       cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-dirty.ng-invalid.ng-touched > :nth-child(1) > .col > :nth-child(4) > .col-sm-9 > .form-control').type('12345678')
       cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-dirty > .row > .col > .form-group:nth-child(5) > .col-sm-9 > .form-control').click()
       cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-dirty > .row > .col > .form-group:nth-child(5) > .col-sm-9 > .form-control').type('12345678')
       cy.get('.col-sm-7 > .ng-untouched > .multiselect-dropdown > div > .dropdown-btn').click()
       cy.get('.col-sm-7 > .ng-untouched > .multiselect-dropdown > .dropdown-list > .item2 > .multiselect-item-checkbox:nth-child(2) > div').click()
       cy.get('.col-sm-7 > .ng-untouched > .multiselect-dropdown > div > .dropdown-btn').click()
       cy.get('.col-sm-7 > .ng-untouched > .multiselect-dropdown > .dropdown-list > .item2 > .multiselect-item-checkbox:nth-child(2) > div').click()
       cy.get('.col-sm-7 > .ng-untouched > .multiselect-dropdown > div > .dropdown-btn').click()
       cy.get('.row > .col > .form-group:nth-child(7) > .col-sm-9 > .form-control').click()
       cy.get('.row > .col > .form-group:nth-child(7) > .col-sm-9 > .form-control').type('test@gmail.com')
       cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-dirty > .modal-footer > .btn-primary').click()
       cy.get('.modal-content > .modal-body > .ng-dirty > .modal-footer > #closeModal').click()
    
    })
   
   })
   