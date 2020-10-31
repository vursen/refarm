export class Context {
  classes: Map<string, Klass> = new Map()
  components: Map<string, Component> = new Map()

  addKlass () {

  }

  addComponent () {

  }
}

export class Klass {

  methods: Map<string, Method>

  trackedProperties: Map<string, TrackedProperty>

  visit () {

  }

  visitMethod () {

  }

  visitTrackedProperty () {

  }
}

export class TrackedProperty {
  // TODO: Type? Klass? Primitive?

  klass: Klass
  context: Context

  reference: Klass

  visit () {

  }
}

export class Method {
  klass: Klass
  context: Context

  calledMethods: Set<Method> = new Set()
  readedTrackedProperties: Set<TrackedProperty> = new Set()
  writedTrackedProperties: Set<TrackedProperty> = new Set()

  visit () {

  }
}

export class Component {
  class: ComponentKlass

  template: ComponentTemplate
}

export class ComponentTemplate {

}

export class ComponentKlass extends Klass {
  methods: Map<string, ComponentMethod>
  attributes: Map<string, ComponentAttribute>

  visit () {
    super.visit()
  }

  visitAttribute () {

  }
}

export class ComponentMethod extends Method {
  klass: ComponentKlass

  readedAttributes: Set<ComponentAttribute> = new Set()

  visit () {
    super.visit()
  }
}

export class ComponentAttribute {
  klass: ComponentKlass
  context: Context

  visit () {

  }
}
