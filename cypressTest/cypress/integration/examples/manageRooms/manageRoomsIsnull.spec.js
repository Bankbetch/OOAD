describe('manageRooms', function() {

    it('ไม่ได้กรอกอะไรเลย', function() {
       cy.visit('http://localhost:4200/')

       cy.get('.card-body > .p-5 > .user > .form-group > #username').click()
       cy.get('.card-body > .p-5 > .user > .form-group > #username').type('admin')
       cy.get('.card-body > .p-5 > .user > .form-group > #password').type('12345678')
       cy.get('.card-body > .p-5 > .user > .form-group > .btn').click()

       cy.get('.wrapper > #sidebar > .list-unstyled > .nav-item:nth-child(2) > .dropdown-toggle').click()
       cy.get('#sidebar > .list-unstyled > .nav-item > #menuStaff > .dropdown-toggle').click()
       cy.get('.nav-item > #menuStaff > #manageSubject > li:nth-child(4) > a').click()
       cy.get('.container > .row > .col > .btn-outline-success > .fa').click()
       cy.get('#exampleModal > .modal-dialog > .modal-content > .modal-footer > .btn-success').click()

       cy.get('.invalid-feedback > div').should(($div) => {
        expect($div).to.contain('กรุณเลือกข้อมูลตึก')
    })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณาเลือกห้อง')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณากรอกจำนวนเก้าอี้')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณากรอกrow')
        })
        cy.get('.invalid-feedback > div').should(($div) => {
            expect($div).to.contain('กรุณากรอกcolumn')
        })
    })
    })
   
   