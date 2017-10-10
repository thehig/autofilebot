// const { expect } = require('chai');
const autoFilebot = require('../src/autoFilebot');



describe('Setup', () => {
    it('Should do a thing', expect(true).to.be.true);
});


describe("autoFileBot", () => {
  
  it('should be defined as a function', () => {
    expect(autoFilebot).to.be.not.null;
    expect(typeof autoFilebot).to.equal('function');
  });

  
  it('should take services and return a function', () => {
    expect(typeof autoFilebot({})).to.equal('function');
  });

  
  it('should take services, config and return an object', () => {
    expect(typeof autoFilebot({})({})).to.equal('object');    
  });

  describe('errors', () => {
    
    it('should error without services', () => {
      expect(()=>autoFilebot()).to.throw(/Services is required/);
    });
    
    it('should error without config', () => {
      expect(()=>autoFilebot({})()).to.throw(/Config is required/);
    });
  });
  
  describe('services & config', () => {
    const services = {};
    const config = {};
    let instance;

    beforeEach(() => {
      instance = autoFilebot(services)(config);  
    });

    afterEach(() => {
      instance = null;
    });
    
    it('should return services', () => {
      expect(instance.services()).to.equal(services);
    });
    
    it('should return config', () => {
      expect(instance.config()).to.equal(config);
    });
  });

  
  describe('checkTempExists', () => {
    const services = { "console": console };
    const config = { from: "./" };
    let instance;

    beforeEach(() => {
      instance = autoFilebot(services)(config);  
    });

    afterEach(() => {
      instance = null;
    });

    
    it('should be a function', () => {
      expect(instance).to.haveOwnProperty('checkTempExists');
      expect(typeof instance.checkTempExists).to.equal('function');
    });

    
    it('should return a promise', () => {
      const promise = instance.checkTempExists();
      expect(promise).to.be.instanceOf(Promise);
    });

    
    it('should reject if passed no params', () => {
      expect(instance.checkTempExists()).to.eventually.equal({});
    });
  });
  
  

  
  
  
});
