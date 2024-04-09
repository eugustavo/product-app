import { publish, subscribe } from "./EventEmitter";

describe('Utils/EventEmitter', () => {
  it('should emit an event', () => {
    const event = 'test-event-emitter';
    const callback = jest.fn();
    
    subscribe(event, callback);
    publish(event);
    
    expect(callback).toHaveBeenCalled();
  })
})