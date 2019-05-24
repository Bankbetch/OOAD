describe('ดูที่นั่งสอบ', function() {

    it('ดูที่นั่งสอบ', function() {
    
       cy.visit('http://localhost:4200/login')
    
       cy.get('.card-body > .p-5 > .user > .form-group > #username').click()
    
       cy.get('.card-body > .p-5 > .user > .form-group > #username').type('admin')
    
       cy.get('.card-body > .p-5 > .user > .form-group > #password').type('12345678')
    
       cy.get('.card-body > .p-5 > .user > .form-group > .btn').click()
    
       cy.get('.wrapper > #sidebar > .list-unstyled > .nav-item:nth-child(2) > .dropdown-toggle').click()
    
       cy.get('#sidebar > .list-unstyled > .nav-item > #menuStaff > .dropdown-toggle').click()
       cy.get('.nav-item > #menuStaff > #manageSubject > li:nth-child(3) > a').click()
       cy.wait(4000)

       cy.get('.table > tbody > tr > td > .btn-info').click()

    })
   
   })
   