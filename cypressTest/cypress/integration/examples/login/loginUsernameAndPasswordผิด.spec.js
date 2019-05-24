describe('login', () => {

    it('host', () => {
        cy.visit('http://localhost:4200/')
    })

    it('username และ password ผิด', () =>{
        cy.get('input[name=username]').type("admin123")
        cy.get('input[name=password]').type("123456789")
        cy.get(':nth-child(4) > .btn').click()
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`กรุณาใส่ username ใหม่อีกครั้ง`)
          })
    })
})