"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BribeUnit = void 0;
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const Action_1 = require("@civ-clone/core-unit/Action");
const UnitBribed_1 = require("./Rules/UnitBribed");
/**
 * A Diplomat pays `cost()` for `target()` to desert to its civilization. Whether it can is up to the `UnitBribed`
 * rules. The Diplomat isn't used up, and keeps its moves.
 */
class BribeUnit extends Action_1.default {
    constructor(from, to, unit, target, cost, ruleRegistry = RuleRegistry_1.instance) {
        super(from, to, unit, ruleRegistry);
        this._cost = cost;
        this._target = target;
        this.addKey('cost');
    }
    cost() {
        return this._cost;
    }
    target() {
        return this._target;
    }
    // `Action.forUnit` rebuilds an action from `(from, to, unit, ruleRegistry)`, which would put the `RuleRegistry` where
    // the target goes.
    // Typed as `Action`: a subclass with a member of its own isn't assignable to it (civ-clone/web-renderer#21).
    forUnit(unit) {
        return new BribeUnit(this.from(), this.to(), unit, this._target, this._cost, this.ruleRegistry());
    }
    perform() {
        this.ruleRegistry().process(UnitBribed_1.default, this.unit(), this._target, this);
    }
}
exports.BribeUnit = BribeUnit;
exports.default = BribeUnit;
//# sourceMappingURL=BribeUnit.js.map