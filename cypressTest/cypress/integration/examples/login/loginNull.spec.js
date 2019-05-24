describe('login', () => {

    it('host', () => {
        cy.visit('http://localhost:4200/')
    })

    it('usernameว่าง password่ว่าง', () =>{
        cy.get(':nth-child(4) > .btn').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`กรุณาใส่ username`)
          })
    })
})