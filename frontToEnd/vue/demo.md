### vue3案例

composition-api  https://composition-api.vuejs.org/#api-introduction

#### vue3相关的重要api

1. setup
2. reactive
3. ref(还可以引用页面上的元素或者组件)
4. isRef
5. toRefs(可以把reactive对象转换成ref对象)
6. computed
7. watch
8. lifecycle (onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onErrorCaptured)
9. provide && inject


#### demo示例

```
import { ref, computed, watch, onMounted } from 'vue'

const App = {
  template: `
    <div>
      <span>count is {{ count }}</span>
      <span>plusOne is {{ plusOne }}</span>
      <button @click="increment">count++</button>
    </div>
  `,
  setup() {
    // reactive state
    const count = ref(0)
    // computed state
    const plusOne = computed(() => count.value + 1)
    // method
    const increment = () => { count.value++ }
    // watch
    watch(() => count.value * 2, val => {
      console.log(`count * 2 is ${val}`)
    })
    // lifecycle
    onMounted(() => {
      console.log(`mounted`)
    })
    // expose bindings on render context
    return {
      count,
      plusOne,
      increment
    }
  }
}
```

#### 生命周期对比

```
beforeCreate            setup()
created                 setup()
beforeMount             onBeforeMount
mounted                 onMounted
beforeUpdate            onBeforeUpdate
updated                 onUpdated
beforeDestroy           onBeforeUnmount
destroyed               onUnmounted
errorCaptured           onErrorCaptured
```
