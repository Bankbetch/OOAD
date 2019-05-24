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
    
     it('delete', () => {
        cy.get('label > input').click()
        cy.get('.btn-outline-danger').click()
        cy.get('.btn-primary').click()
    })
})