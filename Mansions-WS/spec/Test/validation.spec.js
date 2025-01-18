const Validator = require('../../src/utilities/Validators')

describe("validation ", function () {
    it("should validate the incoming emailId", function () {
        expect(Validator.validateEmail("sree@gmail.com")).toBeTruthy();
    }),
    it("should validate the incoming emailId", function () {
        expect(Validator.validateEmail("SREE@gmail.com")).toBeFalsy();
    }),
    it("should validate the incoming password", function () {
        expect(Validator.validatePassword("2@23a")).toBeFalsy();
    }),
    it("should validate the incoming password", function () {
        expect(Validator.validatePassword("A2@23aa1")).toBeTruthy();
    })
});




