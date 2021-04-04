import { TestBed } from '@angular/core/testing';
import { environment } from '../simulation/environment';
import { BitConfigService, BitEventsService, BitHttpService, BitService, BitSupportService, BitSwalService } from 'ngx-bit';

describe('BitEventsService', () => {
  let events: BitEventsService;

  beforeEach(() => {
    if (!events) {
      TestBed.configureTestingModule({
        providers: [
          BitService,
          BitHttpService,
          BitEventsService,
          BitSupportService,
          BitSwalService,
          {
            provide: BitConfigService, useFactory: () => {
              const env = environment.bit;
              const service = new BitConfigService();
              Reflect.ownKeys(env).forEach(key => {
                service[key] = env[key];
              });
              return service;
            }
          }
        ]
      });
      events = TestBed.inject(BitEventsService);
    }
  });

  it('Test publish a component event', (done) => {
    events.on('test').subscribe(args => {
      expect(args).not.toBeNull();
      expect(args.name).toBe('kain');
      events.off('test');
      done();
    });
    events.publish('test', {
      name: 'kain'
    });
  });

  it('Test functional destruction', (done) => {
    expect(events.exists('test')).toBe(false);
    events.publish('test', {
      name: 'kain'
    });
    expect(events.exists('test')).toBe(true);
    events.on('test').subscribe(args => {
      expect(args).not.toBeNull();
      expect(args.name).toBe('abc');
      events.off('test');
      expect(events.exists('test')).toBe(false);
      done();
    });
    expect(events.exists('test')).toBe(true);
    events.publish('test', {
      name: 'abc'
    });
  });

});