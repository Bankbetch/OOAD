describe('login', () => {

    it('host', () => {
        cy.visit('http://localhost:4200/')
    })

    it('passwordผิด usernameถูกต้อง', () =>{
        cy.get('input[name=username]').type("admin")
        cy.get('input[name=password]').type("01234567")
        cy.get(':nth-child(4) > .btn').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`กรุณาใส่ password ใหม่อีกครั้ง`)
          })
    })
})