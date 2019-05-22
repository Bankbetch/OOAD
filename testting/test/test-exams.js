process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server/app');
var Exam = require("../server/models/exam.schema");

var should = chai.should();
chai.use(chaiHttp);


describe('Exams', function() {

    Exam.collection.drop();

    beforeEach(function(done) {
        var newExam = new Exam({
            idExam: '88624459',
            name: 'Object-Oriented Analysis and Design',
            teacher: ['วรวิทย์ วีระพันธุ์', 'จักริน สุขสวัสดิ์ชน'],
            faculty: 'คณะวิทยาการสารสนเทศ',
            timeStart: '09:00',
            timeEnd: '11:55',
            date: '08/05/2562',
            term: 'ภาคการศึกษาปลาย',
            listNisit: ['อนันต์ ไข่ทา', 'วชิรากรณ์ นันทมางกูล', 'สรดนัย ศรีสุมาลย์'],
            amongNisit: '3',
            statusExam: 'เปิดการสอบ',
            examer: ['ณัฐพัชร์ วรรัตนเดชชัย', 'จิรพันธุ์ จิตร์รักรบ'],
            room: '3M210',
        });
        newExam.save(function(err) {
            done();
        });
    });
    afterEach(function(done) {
        Exam.collection.drop();
        done();
    });

    it('should list ALL Exams on /Exams GET', function(done) {
        chai.request(server)
            .get('/exams')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('idExam');
                res.body[0].should.have.property('name');
                res.body[0].idExam.should.equal('88624459');
                res.body[0].name.should.equal('Object-Oriented Analysis and Design');
                done();
            });
    });

    it('should list a SINGLE Exam on /Exam/<id> GET', function(done) {
        var newExam = new Exam({
            idExam: '88624559',
            name: 'Software Testing',
            teacher: ['วรวิทย์ วีระพันธุ์'],
            faculty: 'คณะวิทยาการสารสนเทศ',
            timeStart: '09:00',
            timeEnd: '11:55',
            date: '10/05/2562',
            term : 'ภาคการศึกษาปลาย',
            listNisit: ['อนันต์ ไข่ทา', 'วชิรากรณ์ นันทมางกูล', 'สรดนัย ศรีสุมาลย์'],
            amongNisit: '3',
            statusExam: 'เปิดการสอบ',
            examer: ['ณัฐพัชร์ วรรัตนเดชชัย', 'จิรพันธุ์ จิตร์รักรบ'],
            room: '4M210',
        });
        newExam.save(function(err, data) {
            chai.request(server)
                .get('/exam/' + data.id)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('idExam');
                    res.body.should.have.property('name');
                    res.body.should.have.property('teacher');
                    res.body.should.have.property('faculty');
                    res.body.should.have.property('timeStart');
                    res.body.should.have.property('timeEnd');
                    res.body.should.have.property('date');
                    res.body.should.have.property('listNisit');
                    res.body.should.have.property('amongNisit');
                    res.body.should.have.property('statusExam');
                    res.body.should.have.property('examer');
                    res.body.should.have.property('room');
                    res.body.should.have.property('term');
                    res.body._id.should.equal(data.id);
                    res.body.idExam.should.equal('88624559');
                    res.body.name.should.equal('Software Testing');
                    res.body.teacher[0].should.equal('วรวิทย์ วีระพันธุ์');
                    res.body.faculty.should.equal('คณะวิทยาการสารสนเทศ');
                    res.body.timeStart.should.equal('09:00');
                    res.body.timeEnd.should.equal('11:55');
                    res.body.date.should.equal('10/05/2562');
                    res.body.listNisit[0].should.equal('อนันต์ ไข่ทา');
                    res.body.listNisit[1].should.equal('วชิรากรณ์ นันทมางกูล');
                    res.body.listNisit[2].should.equal('สรดนัย ศรีสุมาลย์')
                    res.body.amongNisit.should.equal('3');
                    res.body.statusExam.should.equal('เปิดการสอบ');
                    res.body.examer[0].should.equal('ณัฐพัชร์ วรรัตนเดชชัย');
                    res.body.examer[1].should.equal('จิรพันธุ์ จิตร์รักรบ');
                    res.body.room.should.equal('4M210');
                    res.body.term.should.equal('ภาคการศึกษาปลาย')
                    done();
                });
        });
    });

    it('should add a SINGLE Exam on /Exams POST add', function(done) {
        chai.request(server)
            .post('/exams')
            .send({
                'idExam': '88624559',
                'name': 'Software Testing',
                'teacher': ['วรวิทย์ วีระพันธุ์'],
                'faculty': 'คณะวิทยาการสารสนเทศ',
                'timeStart': '09:00',
                'timeEnd': '11:55',
                'date': '10/05/2562',
                'term': 'ภาคการศึกษาปลาย',
                'listNisit': ['อนันต์ ไข่ทา', 'วชิรากรณ์ นันทมางกูล', 'สรดนัย ศรีสุมาลย์'],
                'amongNisit': '3',
                'statusExam': 'เปิดการสอบ',
                'examer': ['ณัฐพัชร์ วรรัตนเดชชัย', 'จิรพันธุ์ จิตร์รักรบ'],
                'room': '4M210'
            })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('SUCCESS');
                res.body.SUCCESS.should.be.a('object');
                res.body.SUCCESS.should.have.property('idExam');
                res.body.SUCCESS.should.have.property('name');
                res.body.SUCCESS.should.have.property('teacher');
                res.body.SUCCESS.should.have.property('faculty');
                res.body.SUCCESS.should.have.property('timeStart');
                res.body.SUCCESS.should.have.property('timeEnd');
                res.body.SUCCESS.should.have.property('date');
                res.body.SUCCESS.should.have.property('term');
                res.body.SUCCESS.should.have.property('listNisit');
                res.body.SUCCESS.should.have.property('amongNisit');
                res.body.SUCCESS.should.have.property('statusExam');
                res.body.SUCCESS.should.have.property('examer');
                res.body.SUCCESS.should.have.property('room');
                res.body.SUCCESS.idExam.should.equal('88624559');
                res.body.SUCCESS.name.should.equal('Software Testing');
                res.body.SUCCESS.teacher[0].should.equal('วรวิทย์ วีระพันธุ์');
                res.body.SUCCESS.faculty.should.equal('คณะวิทยาการสารสนเทศ');
                res.body.SUCCESS.timeStart.should.equal('09:00');
                res.body.SUCCESS.timeEnd.should.equal('11:55');
                res.body.SUCCESS.date.should.equal('10/05/2562');
                res.body.SUCCESS.term.should.equal('ภาคการศึกษาปลาย');
                res.body.SUCCESS.listNisit[0].should.equal('อนันต์ ไข่ทา');
                res.body.SUCCESS.listNisit[1].should.equal('วชิรากรณ์ นันทมางกูล');
                res.body.SUCCESS.listNisit[2].should.equal('สรดนัย ศรีสุมาลย์')
                res.body.SUCCESS.amongNisit.should.equal('3');
                res.body.SUCCESS.statusExam.should.equal('เปิดการสอบ');
                res.body.SUCCESS.examer[0].should.equal('ณัฐพัชร์ วรรัตนเดชชัย');
                res.body.SUCCESS.examer[1].should.equal('จิรพันธุ์ จิตร์รักรบ');
                res.body.SUCCESS.room.should.equal('4M210');
                done();
            });
    });

    it('should update a SINGLE Exam on /Exam/<id> PUT update', function(done) {
        chai.request(server)
            .get('/exams')
            .end(function(err, res) {
                chai.request(server)
                    .put('/exam/' + res.body[0]._id)
                    .send({ name: 'OOAD' })
                    .end(function(error, response) {
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.body.should.have.property('UPDATED');
                        response.body.UPDATED.should.be.a('object');
                        response.body.UPDATED.should.have.property('name');
                        response.body.UPDATED.name.should.equal('OOAD');
                        done();
                    });
            });
    });

    it('should delete a SINGLE Exam on /Exam/<id> DELETE', function(done) {
        chai.request(server)
            .get('/exams')
            .end(function(err, res) {
                chai.request(server)
                    .delete('/exam/' + res.body[0]._id)
                    .end(function(error, response) {
                        response.should.have.status(200);
                        response.should.be.json;
                        response.body.should.be.a('object');
                        response.body.should.have.property('REMOVED');
                        response.body.REMOVED.should.be.a('object');
                        response.body.REMOVED.should.have.property('idExam');
                        response.body.REMOVED.idExam.should.equal('88624459');
                        done();
                    });
            });
    });

});