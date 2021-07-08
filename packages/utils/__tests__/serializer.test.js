import { Serializer } from '../src/serializer';

describe('@nytramr/utils', () => {
  describe('Serializer', () => {
    describe('stringify', () => {
      describe('with no circular references', () => {
        test.each`
          title                   | object
          ${'Object'}             | ${{ a: 1 }}
          ${'Object with Array'}  | ${{ a: [1, 2, 3] }}
          ${'Object with Object'} | ${{ a: { b: 1 } }}
          ${'Array'}              | ${[1, 2, 3]}
          ${'Array with Array'}   | ${[1, 2, 3, ['a', 'b', 'c']]}
        `('returns $title', ({ object }) => {
          expect(Serializer.stringify(object)).toMatchSnapshot();
        });
      });
    });

    describe('serialize', () => {
      describe('with no circular references', () => {
        test.each`
          title                           | object                       | result
          ${'Object'}                     | ${{ a: 1 }}                  | ${'object Object'}
          ${'Object instance'}            | ${new Object()}              | ${'object Object'}
          ${'Object with no constructor'} | ${Object.create(null)}       | ${'object Null'}
          ${'Array'}                      | ${[1, 2, 3]}                 | ${'object Array'}
          ${'String'}                     | ${'hello world'}             | ${'string String'}
          ${'Set'}                        | ${new Set([1, 2, 1, 3])}     | ${'object Set'}
          ${'Map'}                        | ${new Map([[1, 2], [1, 3]])} | ${'object Map'}
          ${'Boolean'}                    | ${true}                      | ${'boolean Boolean'}
          ${'Number'}                     | ${100}                       | ${'number Number'}
          ${'Function'}                   | ${() => {}}                  | ${'function Function'}
          ${'Serializer class'}           | ${Serializer}                | ${'function Function'}
          ${'Serializer instance'}        | ${new Serializer()}          | ${'object Serializer'}
          ${'Serializer instance'}        | ${new Serializer()}          | ${'object Serializer'}
        `('returns $title', ({ object, result }) => {
          const serializer = new Serializer();
          expect(serializer.serialize(object)).toEqual(result);
        });
      });
    });
  });
});
