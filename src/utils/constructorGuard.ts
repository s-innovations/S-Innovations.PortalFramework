

interface constructorGuard<T, O> {
    (o: T | O): o is T
}

export = constructorGuard;