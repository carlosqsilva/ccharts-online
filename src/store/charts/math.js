const core = require("mathjs/core")
const math = core.create()
math.import(require("mathjs/lib/type/matrix"))
math.import(require("mathjs/lib/function/matrix/size"))
math.import(require("mathjs/lib/function/matrix/inv"))
math.import(require("mathjs/lib/function/matrix/transpose"))
math.import(require("mathjs/lib/function/arithmetic/add"))
math.import(require("mathjs/lib/function/arithmetic/multiply"))
math.import(require("mathjs/lib/function/arithmetic/subtract"))
math.import(require("mathjs/lib/function/statistics/mean"))

export { math }
