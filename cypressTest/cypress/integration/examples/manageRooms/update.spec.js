describe('manageRooms', () => {

    it('host', () => {
        cy.visit('http://localhost:4200/')
    })

    it('login', () =>{
        cy.get('input[name=username]').type("admin")
        cy.get('input[name=password]').type("12345678")
        cy.get(':nth-child(4) > .btn').click()
    })

    it('clickManageRooms', () => {
        cy.get('[href="#menuStaff"]').click()
        cy.get('#menuStaff > :nth-child(3) > a').click()
        cy.get('#menuStaff > .dropdown-toggle').click()
        cy.get(':nth-child(4) > a').click()
    })

      it('update', () => {
        cy.get(':nth-child(5) > .btn').click()
        cy.wait(500)
        cy.get('#exampleModal3 > .modal-dialog > .modal-content > .modal-body > form.ng-untouched > :nth-child(2) > :nth-child(1) > .form-group > .form-control').clear()
        cy.get('#exampleModal3 > .modal-dialog > .modal-content > .modal-body > form.ng-untouched > :nth-child(2) > :nth-child(1) > .form-group > .form-control').type('6y-04')
        cy.get('form.ng-dirty > .modal-footer > .btn-success').click()
    }) 
    
     
})