import { diffBetweenDBS } from './returnDiff'

describe('Utils/Return Diff', () => {
  it('should return the difference between two data', () => {
    const dbOne = [
      { id: 1, value: 'John Doe' },
      { id: 2, value: 'Jane Doe' },
    ];

    const dbTwo = [
      { id: 1, value: 'John Doe' },
      { id: 2, value: 'Jane Test' },
    ];

    const result = diffBetweenDBS(dbOne, dbTwo)

    expect(result[0]).toHaveProperty('id')
    expect(result[0].id).toBe(2)
  })
})