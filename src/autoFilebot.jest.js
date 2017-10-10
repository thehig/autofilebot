const autoFilebot = require('./autoFilebot');

describe("autoFileBot", () => {
  
  it('should be defined as a function', () => {
    expect(autoFilebot).toBeDefined();
    expect(typeof autoFilebot).toEqual('function');
  });

  
  it('should take services and return a function', () => {
    expect(typeof autoFilebot({})).toEqual('function');
  });

  
  it('should take services, config and return an object', () => {
    expect(typeof autoFilebot({})({})).toEqual('object');    
  });

  describe('errors', () => {
    
    it('should error without services', () => {
      expect(()=>autoFilebot()).toThrow(/Services is required/);
    });
    
    it('should error without config', () => {
      expect(()=>autoFilebot({})()).toThrow(/Config is required/);
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
      expect(instance.services()).toEqual(services);
    });
    
    it('should return config', () => {
      expect(instance.config()).toEqual(config);
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
      expect(instance).toHaveProperty('checkTempExists');
      expect(typeof instance.checkTempExists).toEqual('function');
    });

    
    it('should return a promise', () => {
      const promise = instance.checkTempExists();
      expect(promise).toBeInstanceOf(Promise);
    });

    
    it('should reject if passed no params', () => {
      expect(instance.checkTempExists()).resolves.toEqual({});
    });
  });
  
  

  
  
  
});
