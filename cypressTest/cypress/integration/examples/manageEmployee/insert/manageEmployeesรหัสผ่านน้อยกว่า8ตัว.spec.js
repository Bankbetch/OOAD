describe('manageEmployee', function () {

    it('login', function () {
        cy.visit('http://localhost:4200/')
        cy.get('.card-body > .p-5 > .user > .form-group > #username').click()
        cy.get('.card-body > .p-5 > .user > .form-group > #username').type('admin')
        cy.get('.card-body > .p-5 > .user > .form-group > #password').click()
        cy.get('.card-body > .p-5 > .user > .form-group > #password').type('12345678')
        cy.get('.card-body > .p-5 > .user > .form-group > .btn').click()
    })

    it('รหัสผ่านน้อยกว่า8ตัว', function () {
        cy.get('.wrapper > #sidebar > .list-unstyled > .nav-item:nth-child(2) > .dropdown-toggle').click()
        cy.get('.list-unstyled > .nav-item > #menuStaff > li > a').click()
        cy.get('app-setting-user > .container > .row > .col > .btn-outline-success').click()
        cy.get('.modal-content > .modal-body > .ng-untouched > .modal-footer > #closeModal').click()
        cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-untouched > .row > .col > .form-group:nth-child(1) > .col-sm-9 > .form-control').click()
        cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-untouched > .row > .col > .form-group:nth-child(1) > .col-sm-9 > .form-control').type('anan')
        cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-dirty > .row > .col > .form-group:nth-child(2) > .col-sm-9 > .form-control').click()
        cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-dirty > .row > .col > .form-group:nth-child(2) > .col-sm-9 > .form-control').type('khaita')
        cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-dirty > .row > .col > .form-group:nth-child(3) > .col-sm-9 > .form-control').click()
        cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-dirty > .row > .col > .form-group:nth-child(3) > .col-sm-9 > .form-control').type('59160143')
        cy.get('.row > .col > .form-group:nth-child(4) > .col-sm-9 > .form-control:nth-child(1)').click()
        cy.get('.row > .col > .form-group:nth-child(4) > .col-sm-9 > .form-control:nth-child(1)').type('1')
        cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-dirty > .row > .col > .form-group:nth-child(5) > .col-sm-9 > .form-control').click()
        cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > form.ng-dirty > :nth-child(1) > .col > :nth-child(5) > .col-sm-9 > .form-control').type('1')
        cy.get('.col-sm-7 > .ng-untouched > .multiselect-dropdown > div > .dropdown-btn').click()
        cy.get('.col-sm-7 > .ng-untouched > .multiselect-dropdown > .dropdown-list > .item2 > .multiselect-item-checkbox:nth-child(1)').click()
        cy.get('.row > .col > .form-group:nth-child(7) > .col-sm-9 > .form-control').click()
        cy.get('.row > .col > .form-group:nth-child(7) > .col-sm-9 > .form-control').type('ananandice@gmail.com')
        cy.get('#modalInsert > .modal-dialog > .modal-content > .modal-body > .ng-dirty > .modal-footer > .btn-primary').click()
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('รหัสผ่านไม่ครบ8ตัว')
          }) 
    })

})
