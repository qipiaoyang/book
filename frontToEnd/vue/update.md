### vue3升级的部分核心原理

结合前面一章，我们很清楚的知道vue3大概干了些什么，这里我们就主要把部分我的个人理解结合源码来写一下

#### 1. proxy与reflect代理

```
const toProxy = new WeakMap()
const toRaw = new WeakMap()
const targetMap = new WeakMap()
const activeEffectStack = []

const isObj = (x: any): x is object => typeof x === 'object'

function track(target, key) {
  const effect = activeEffectStack[activeEffectStack.length - 1]
  if (effect) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }
    if (!dep.has(effect)) {
      dep.add(effect)
    }
  }
}

function trigger(target, key) {
  let deps = targetMap.get(target)
  const effects = new Set()

  deps.get(key).forEach(e => effects.add(e))
  effects.forEach((e: any) => e())
}

export function reactive(target) {
  if (!isObj(target)) return target

  let proxy = toProxy.get(target)
  if (proxy) return proxy

  if (toRaw.has(target)) return target

  const handlers = {
    get(target, key, receiver) {
      let newValue = target[key]

      if (isObj(newValue)) {
        return reactive(newValue)
      }
      let res = Reflect.get(target, key, receiver)
      track(target, key)
      return res
    },
    set(target, key, value, receiver) {
      let res = Reflect.set(target, key, value, receiver)
      if (key in target) trigger(target, key)
      return res
    },
    deleteProperty(target, key, receiver) {
      return Reflect.defineProperty(target, key, receiver)
    }
  }

  let observed = new Proxy(target, handlers as any)

  toProxy.set(target, observed)
  toRaw.set(observed, target)

  if (!targetMap.has(target)) {
    targetMap.set(target, new Map())
  }

  return observed
}

```



#### 2. runtime-core



