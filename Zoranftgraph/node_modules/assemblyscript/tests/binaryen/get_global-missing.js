var binaryen = require("binaryen");

var mod = new binaryen.Module();
var funcType = mod.addFunctionType("v", binaryen.void, []);
var func = mod.addFunction("test", funcType, [],
  mod.block("", [
    mod.drop(
      mod.getGlobal("missing", binaryen.i32)
    )
  ])
);
mod.addFunctionExport("test", "test", func);

console.log(mod.emitText());
if (mod.validate())
  console.log("-> validates");
mod.emitBinary(); // -> Assertion failed: mappedGlobals.count(name), at: binaryen/src/wasm/wasm-binary.cpp,355,getGlobalIndex at Error
