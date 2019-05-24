describe('manageEmployee', function () {

    it('login', function () {
        cy.visit('http://localhost:4200/')
        cy.get('.card-body > .p-5 > .user > .form-group > #username').click()
        cy.get('.card-body > .p-5 > .user > .form-group > #username').type('admin')
        cy.get('.card-body > .p-5 > .user > .form-group > #password').click()
        cy.get('.card-body > .p-5 > .user > .form-group > #password').type('12345678')
        cy.get('.card-body > .p-5 > .user > .form-group > .btn').click()
    })

    it('ช่องเป็นค่าว่าง', function () {
        cy.get('.wrapper > #sidebar > .list-unstyled > .nav-item:nth-child(2) > .dropdown-toggle').click()
        cy.get('.list-unstyled > .nav-item > #menuStaff > li > a').click()
        cy.get('app-setting-user > .container > .row > .col > .btn-outline-success').click()
        cy.get('.modal-content > .modal-body > .ng-untouched > .modal-footer > #closeModal').click()
        cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-untouched > .row > .col > .form-group:nth-child(1) > .col-sm-9 > .form-control').click()
        cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-dirty > .modal-footer > .btn-primary').click()
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณากรอกชื่อ')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณากรอกนามสกุล')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณากรอกชื่อผู้ใช้')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณากรอกรหัสผ่าน')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณากรอกยืนยันรหัสผ่าน')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณาเลือกสถานะ')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณากรอกอีเมล์')
        })

    })

})
