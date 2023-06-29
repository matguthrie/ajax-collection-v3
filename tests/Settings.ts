import { Settings } from './../dist/settings/Settings';

const s = new Settings({ });


const URL_TESTS = [
  //Strings
  [{ some: "value" } , 'some=value'],
  [{ other: "thing" } , 'other=thing'],
  [{ me: 'I like trains' }, "me=I%20like%20trains"],
  [{ this: "that", here: "there" }, "this=that&here=there"],

  //Numbers
  [{ percent: 10}, 'percent=10'],
  [{ price: 0.01}, 'price=0.01'],
  [{ this: 100, that: 0.411 }, 'this=100&that=0.411'],

  //Booleans
  [{ good: true }, 'good=true'],
  [{ bad: false }, 'bad=false'],
  [{ good: true, bad: false }, 'good=true&bad=false'],

  //Arrays
  [{ where: ['here', 'there'] }, 'where=here%2Cthere'],
  [{ whatAbout: ['this and', 'that'] }, 'whatAbout=this%2520and%2Cthat'],
  [{ nested: [['wish', 'me'], ['the', 'best'], 'of luck'] }, 'nested=wish%252Cme%2Cthe%252Cbest%2Cof%2520luck'],
  [{ nested: { crap: 'here', and: 'also' }, over: { here: [ 'yay', 'cool' ] }}, 'nested=(crap%3Dhere%26and%3Dalso)&over=(here%3Dyay%252Ccool)']
];



describe('urlEscapeObject', () => {
  it('should return an empty string for nothing', () => {
    expect(s.urlEscapeObject()).toBe('');
    expect(s.urlEscapeObject({})).toBe('');
    expect(s.urlEscapeObject({ any:'thing' })).not.toBe('');
  });

  it('should parse into escaped values', () => {
    URL_TESTS.forEach(([test,result]) => {
      expect(s.urlEscapeObject(test)).toBe(result);
    });
  });
});

describe('urlUnescapeObject', () => {
  it('should return an empty object for nothing', () => {
    URL_TESTS.forEach(([test,result]) => {
      expect(s.urlUnescapeObject(result)).toEqual(test);
    });
  });
});