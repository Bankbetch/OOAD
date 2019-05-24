describe('exam', function() {

    it('update', function() {
    
       cy.visit('http://localhost:4200/login')

       cy.get('.card-body > .p-5 > .user > .form-group > #username').click()
       cy.get('.card-body > .p-5 > .user > .form-group > #username').type('admin')
       cy.get('.card-body > .p-5 > .user > .form-group > #password').type('12345678')
       cy.get('.card-body > .p-5 > .user > .form-group > .btn').click()
    
       cy.get('.wrapper > #sidebar > .list-unstyled > .nav-item:nth-child(2) > .dropdown-toggle').click()
       cy.get('#sidebar > .list-unstyled > .nav-item > #menuStaff > .dropdown-toggle').click()
       cy.get('.nav-item > #menuStaff > #manageSubject > li:nth-child(3) > a').click()
       cy.wait(1000)
       cy.get('tbody > tr > td > .btn-warning > .fa').click()
       cy.get('.form-group > .ng-untouched > .multiselect-dropdown > div > .dropdown-btn').click()
       cy.get('.multiselect-dropdown > .dropdown-list > .item2 > .multiselect-item-checkbox:nth-child(1) > div').click()
       cy.wait(1000)
       
       cy.get('.form-group > .ng-untouched > .multiselect-dropdown > div > .dropdown-btn').click()
       cy.get('#room').select('5t-03')
       cy.get('.modal-content > .modal-body > .ng-dirty > .modal-footer:nth-child(6) > .btn-success').click()
    
    })
   
   })
   