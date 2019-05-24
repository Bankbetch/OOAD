describe('manageBuilds', () => {

    it('host', () => {
        cy.visit('http://localhost:4200/')
    })

    it('ไม่ได้กรอกอะไรเลย', () =>{
        cy.get('input[name=username]').type("admin")
        cy.get('input[name=password]').type("12345678")
        cy.get(':nth-child(4) > .btn').click()
    
        cy.get('[href="#menuStaff"]').click()
        cy.get('#menuStaff > :nth-child(3) > a').click()
        cy.get('#menuStaff > .dropdown-toggle').click()
        cy.get(':nth-child(5) > a').click()
        cy.get('.btn-outline-success').click()

        cy.get('#exampleModal > .modal-dialog > .modal-content > .modal-body > form.ng-untouched > .modal-footer > .btn-success').click()
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณากรอกข้อมูลตึก')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณาเลือกห้อง')
        })
    })

})