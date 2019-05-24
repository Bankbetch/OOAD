describe('ดูคุมสอบ', function() {

    it('ดูคุมสอบ', function() {
   
       cy.visit('http://localhost:4200/login')

       cy.get('.card-body > .p-5 > .user > .form-group > #username').click()
       cy.get('.card-body > .p-5 > .user > .form-group > #username').type('admin')
       cy.get('.card-body > .p-5 > .user > .form-group > #password').type('12345678')
       cy.get('.card-body > .p-5 > .user > .form-group > .btn').click()
       cy.get('.wrapper > #sidebar > .list-unstyled > .nav-item:nth-child(3) > .dropdown-toggle').click()
       cy.get('.list-unstyled > .nav-item > #menuProctor > li > a').click()
    
    })
   
   })
   