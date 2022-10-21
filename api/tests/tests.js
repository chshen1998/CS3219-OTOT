import chai from 'chai'
import chaiHttp from "chai-http";
import app from '../index.js'
import 'dotenv/config'
import { ormCreateModule } from '../model/module-orm.js';
import mongoose from 'mongoose';

chai.use(chaiHttp)
chai.should()

describe('Test API', () => {

    before(async ()=> {
        let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;
        mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
        mongoose.Promise = global.Promise
        await mongoose.connection.dropDatabase()
    })

    after(async ()=> {
        await mongoose.connection.dropDatabase()  
    })

    // GET
    describe("GET /module", () => {
        it("It should get all modules", (done) => {
            chai.request(app)
                .get('/module')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                })
        })
    })

    // POST
    describe("POST /module", () => {
        it("It should post a new module", (done) => {
            const module = {
                moduleCode: "testCode",
                moduleTitle: "testTitle"
            };
            chai.request(app)
                .post('/module')
                .send(module)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('code').eq('testCode');
                    response.body.should.have.property('title').eq('testTitle');
                    done();
                })
        })

        it("It should return missing moduleCode error", (done) => {
            const module = {
                moduleTitle: "testTitle"
            }
            chai.request(app)
                .post('/module')
                .send(module)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("Missing module code");
                    done();
                })
        })

        it("It should return missing moduleTitle error", (done) => {
            const module = {
                moduleCode: "testCode"
            }
            chai.request(app)
                .post('/module')
                .send(module)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("Missing module title");
                    done();
                })
        })

        it("It should return Module already exists error", (done) => {
            const module = {
                moduleCode: "testCode",
                moduleTitle: "testTitle"
            }
            chai.request(app)
                .post('/module')
                .send(module)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("Module testCode already exists");
                    done();
                })
        })
    })


    // PUT
    describe("PUT /module", () => {
        it("It should update module", (done) => {
            const module = {
                moduleCode: "testCode",
                moduleTitle: "updatedTitle"
            }
            chai.request(app)
                .put('/module')
                .send(module)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('code').eq('testCode');
                    response.body.should.have.property('title').eq('updatedTitle');
                    done();
                })
        })

        it("It should return module does not exist error", (done) => {
            const module = {
                moduleCode: "invalidCode",
                moduleTitle: "updatedTitle"
            }
            chai.request(app)
                .put('/module')
                .send(module)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("Module invalidCode does not exist");
                    done();
                })
        })        
    })

    // DELETE
    describe("DELETE /module", () => {
        it("It should delete module", (done) => {
            chai.request(app)
                .delete('/module/testCode')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.text.should.be.eq("Module deleted");
                    done();
                })
        })

        it("It should return module does not exist error", (done) => {
            chai.request(app)
                .delete('/module/testCode')
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("Module testCode does not exist");
                    done();
                })
        })  
    })
})

