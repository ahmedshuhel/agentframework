import { agent } from '../agent'
import { failure } from './failure'

@agent()
class TestFailureAgentClass {

  @failure(null)
  testNull() {
    throw new Error()
  }

  @failure(0)
  testZero(): number {
    throw new Error()
  }

  @failure('')
  testEmptyString(): string {
    throw new Error()
  }

}

describe('@failure', () => {

  describe('# should able to', () => {

    it('get null when throw', () => {
      const failureAgent = new TestFailureAgentClass();
      expect(failureAgent.testNull()).toBeNull();
    });

    it('get 0 when throw', () => {
      const failureAgent = new TestFailureAgentClass();
      expect(failureAgent.testZero()).toBe(0);
    });

    it('get empty string when throw', () => {
      const failureAgent = new TestFailureAgentClass();
      expect(failureAgent.testEmptyString()).toBe('');
    });

  });

});
