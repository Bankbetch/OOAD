describe('login', () => {

    it('host', () => {
        cy.visit('http://localhost:4200/')
    })

    it('login สำเร็จ', () =>{
        cy.get('input[name=username]').type("admin")
        cy.get('input[name=password]').type("12345678")
        cy.get(':nth-child(4) > .btn').click()
    })
})