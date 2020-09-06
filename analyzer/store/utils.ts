import * as tsMorph from 'ts-morph'

/**
 * Is the node a store class declaration?
 */
export function isStoreClassDeclaration (node: tsMorph.Node): node is tsMorph.ClassDeclaration {
  return Boolean(
    tsMorph.Node.isClassDeclaration(node) &&
    node.getProperty((property) => property.getDecorator('State') !== undefined)
  )
}

/**
 * Is the node a store state property declaration?
 */
export function isStoreStatePropertyDeclaration (node: tsMorph.Node): node is tsMorph.PropertyDeclaration {
  return Boolean(
    tsMorph.Node.isPropertyDeclaration(node) &&
    node.getDecorator('State')
  )
}

/**
 * Is the node a store action method declaration?
 */
export function isStoreActionMethodDeclaration (node: tsMorph.Node): node is tsMorph.MethodDeclaration {
  return Boolean(
    tsMorph.Node.isMethodDeclaration(node) &&
    node.getDecorator('Action')
  )
}

/**
 * Is the node a store inject property declaration?
 */
export function isStoreInjectPropertyDeclaration (node: tsMorph.Node): node is tsMorph.PropertyDeclaration {
  return Boolean(
    tsMorph.Node.isPropertyDeclaration(node) &&
    node.getDecorator('Inject')
  )
}
