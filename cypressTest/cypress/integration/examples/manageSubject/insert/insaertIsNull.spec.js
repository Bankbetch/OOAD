describe('manageSubject', function () {

    it('ไม่ได้กรอกอะไรเลย', function () {

        cy.visit('http://localhost:4200/login')

        cy.get('.card-body > .p-5 > .user > .form-group > #username').click()
        cy.get('.card-body > .p-5 > .user > .form-group > #username').type('admin')
        cy.get('.card-body > .p-5 > .user > .form-group > #password').type('12345678')
        cy.get('.card-body > .p-5 > .user > .form-group > .btn').click()

        cy.get('.wrapper > #sidebar > .list-unstyled > .nav-item:nth-child(2) > .dropdown-toggle').click()
        cy.get('#sidebar > .list-unstyled > .nav-item > #menuStaff > .dropdown-toggle').click()
        cy.get('.nav-item > #menuStaff > #manageSubject > li > .nav-link').click()
        cy.get('#content > app-manage-exam > .container > .row > .btn:nth-child(5)').click()

        cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > form.ng-untouched > .modal-footer > .btn-success').click()

        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณาเลือกรหัสวิชา')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณาเลือกชื่อวิชา')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณาเลือกอาจารย์')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณากรอกคณะ')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณาเลือกตึก')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณาเลือกห้อง')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณากรอกหน่วยกิต')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณาเลือกเทอม')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณาเลือกวัน')
        })
    })

})
