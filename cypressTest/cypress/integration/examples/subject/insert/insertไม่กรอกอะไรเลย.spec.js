describe('subject', function () {

    it('ไม่กรอกอะไรเลย', function () {

        cy.visit('http://localhost:4200/')

        cy.get('.card-body > .p-5 > .user > .form-group > #username').click()
        cy.get('.card-body > .p-5 > .user > .form-group > #username').type('admin')
        cy.get('.card-body > .p-5 > .user > .form-group > #password').type('12345678')
        cy.get('.card-body > .p-5 > .user > .form-group > .btn').click()

        cy.get('.wrapper > #sidebar > .list-unstyled > .nav-item:nth-child(2) > .dropdown-toggle').click()
        cy.get('#sidebar > .list-unstyled > .nav-item > #menuStaff > .dropdown-toggle').click()
        cy.get('.nav-item > #menuStaff > #manageSubject > li:nth-child(2) > a').click()
        cy.get('.container > .row > .col > .btn-outline-success > .fa').click()

        cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > form.ng-untouched > .modal-footer > .btn-success').click()

        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณากรอกรหัสวิชา')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณากรอกชื่อวิชา')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณากรอกคณะ')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณากรอกหน่วยกิต')
        })
    })

})
