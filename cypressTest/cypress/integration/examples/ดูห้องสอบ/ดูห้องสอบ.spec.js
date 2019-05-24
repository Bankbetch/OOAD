describe('ดูห้องสอบ', function() {

    it('ดูห้องสอบ', function() {
    
       cy.visit('http://localhost:4200/login')

       cy.get('.card-body > .p-5 > .user > .form-group > #username').click()
       cy.get('.card-body > .p-5 > .user > .form-group > #username').type('59160576')
       cy.get('.card-body > .p-5 > .user > .form-group > #password').type('59160576')
       cy.get('.card-body > .p-5 > .user > .form-group > .btn').click()
       cy.get('.wrapper > #sidebar > .list-unstyled > .nav-item > .dropdown-toggle').click()
       cy.get('.list-unstyled > .nav-item > #menuStudent > li > a').click()
    })
   
   })
   