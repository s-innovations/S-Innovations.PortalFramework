
import TOGuard = require("./constructorGuard");
import isArray = require("./isArray");


function constructorMapper<VM, VMOptions>(guard: TOGuard<VM, VMOptions>, ctor: new (p: VMOptions) => VM): (o: Array<VM | VMOptions> | VM | VMOptions) => Array<VM> | VM {
    return (o: Array<VM | VMOptions> | VM | VMOptions) => {

        function mapper(vmOrOptions: VM | VMOptions) {
            if (guard(vmOrOptions)) {
                return vmOrOptions;
            } else {
                return new ctor(vmOrOptions);
            }
        }
      
        if (isArray(o)) {
            return o.map(mapper);
        } else {
            return mapper(o);
        }
    };
}
export = constructorMapper;