var Blamer = require('../src/Blamer');
describe("Blamer", function(){
    var sut, file;

    beforeEach(function () {
        sut = new Blamer();
    });

    it("should get blame by file", function (){
        sut.getBlameByFile(file).should.be.an('object');
    });

});