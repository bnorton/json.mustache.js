describe('json.mustache', function() {
  var config, json = require('../lib/index');

  beforeEach(function() {
    spyOn(process, 'cwd').and.callThrough();

    config = json('sample');
  });

  it('should cache the contents', function() {
    expect(process.cwd.calls.count()).toBe(1);

    expect(json('sample').id).toBe('test-database');
    expect(json('sample').id).toBe('test-database');

    expect(process.cwd.calls.count()).toBe(1);
  });

  it('should have the value', function() {
    expect(config.id).toBe('test-database');
    expect(config.port).toBe(27011);
  });

  it('should interpolate the value', function() {
    expect(config.url).toBe('mongodb://localhost:27011/test-database');
  });

  describe('when given a explicit environment', function() {
    beforeEach(function() {
      config = json('sample', 'production');
    });

    it('should have the value', function() {
      expect(config.id).toBe('production-database');
      expect(config.port).toBe(27012);
    });

    it('should interpolate the value', function() {
      expect(config.url).toBe('mongodb://mongodb.example.com:27012/production-database');
    });
  });

  describe('when a config key value is missing', function() {
    beforeEach(function() {
      config = json('sample', 'missing');
    });

    it('should not interpolate the value', function() {
      expect(config.url).toBe('{{port}}/{{id}}');
    });
  });
});
