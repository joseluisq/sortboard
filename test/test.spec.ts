import markup from './markup'
import { Listener, sortboard, Sortboard } from '../src'

markup()

describe('Sortboard', () => {
  let sb: Sortboard

  beforeEach(() => {
    sb = sortboard({
      container: '#sortlist',
      selector: 'li'
    }) as Sortboard
  })

  describe('api', () => {
    it('should be a function', () => {
      expect(typeof sortboard).toBe('function')
    })

    it('should return an object', () => {
      expect(typeof sb).toBe('object')
    })

    it('should contain an `on` function', () => {
      expect(typeof sb.on).toBe('function')
    })

    it('should contain an `off` function', () => {
      expect(typeof sb.off).toBe('function')
    })

    it('should contain a `filter` function', () => {
      expect(typeof sb.filter).toBe('function')
    })

    it('should contain a `reset` function', () => {
      expect(typeof sb.reset).toBe('function')
    })

    it('should contain a `sort` function', () => {
      expect(typeof sb.sort).toBe('function')
    })
  })

  describe('on', () => {
    let onSpy: jasmine.Spy
    const onEvent: Listener = () => console.log('ok!')

    describe('`filter` event', () => {
      beforeEach(() => {
        onSpy = spyOn(sb, 'on')
        sb.on('filter', onEvent)
      })

      it('should be a function', () => {
        expect(typeof sb.filter).toBe('function')
      })

      it('should be called', () => {
        expect(sb.on).toHaveBeenCalled()
      })

      it('should track all the arguments of its calls', () => {
        expect(sb.on).toHaveBeenCalledWith('filter', onEvent)
      })

      it('should contain the given arguments (`filter` event)', () => {
        const [ type, args ] = onSpy.calls.argsFor(0)

        expect(type).toBe('filter')
        expect(args).toEqual(onEvent)
      })
    })

    describe('`sort` event', () => {
      beforeEach(() => {
        onSpy = spyOn(sb, 'on')
        sb.on('sort', onEvent)
      })

      it('should be a function', () => {
        expect(typeof sb.sort).toBe('function')
      })

      it('should be called', () => {
        expect(sb.on).toHaveBeenCalled()
      })

      it('should track all the arguments of its calls', () => {
        expect(sb.on).toHaveBeenCalledWith('sort', onEvent)
      })

      it('should contain the given arguments (`sort` event)', () => {
        const [ type, args ] = onSpy.calls.argsFor(0)

        expect(type).toBe('sort')
        expect(args).toEqual(onEvent)
      })
    })
  })

})
