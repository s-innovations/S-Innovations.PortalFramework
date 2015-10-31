define(["require", "exports", "./isArray"], function (require, exports, isArray) {
    function constructorMapper(guard, ctor) {
        return function (o) {
            function mapper(vmOrOptions) {
                if (guard(vmOrOptions)) {
                    return vmOrOptions;
                }
                else {
                    return new ctor(vmOrOptions);
                }
            }
            if (isArray(o)) {
                return o.map(mapper);
            }
            else {
                return mapper(o);
            }
        };
    }
    return constructorMapper;
});
//# sourceMappingURL=constructorMapper.js.map