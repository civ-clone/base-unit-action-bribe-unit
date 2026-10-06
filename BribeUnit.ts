import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import Action from '@civ-clone/core-unit/Action';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';
import UnitBribed from './Rules/UnitBribed';

/**
 * A Diplomat pays `cost()` for `target()` to desert to its civilization. Whether it can is up to the `UnitBribed`
 * rules. The Diplomat isn't used up, and keeps its moves.
 */
export class BribeUnit extends Action {
  private _cost: number;
  private _target: Unit;

  constructor(
    from: Tile,
    to: Tile,
    unit: Unit,
    target: Unit,
    cost: number,
    ruleRegistry: RuleRegistry = ruleRegistryInstance
  ) {
    super(from, to, unit, ruleRegistry);

    this._cost = cost;
    this._target = target;

    this.addKey('cost');
  }

  cost(): number {
    return this._cost;
  }

  target(): Unit {
    return this._target;
  }

  // `Action.forUnit` rebuilds an action from `(from, to, unit, ruleRegistry)`, which would put the `RuleRegistry` where
  // the target goes.
  // Typed as `Action`: a subclass with a member of its own isn't assignable to it (civ-clone/web-renderer#21).
  forUnit(unit: Unit): Action {
    return new BribeUnit(
      this.from(),
      this.to(),
      unit,
      this._target,
      this._cost,
      this.ruleRegistry()
    ) as unknown as Action;
  }

  perform(): void {
    this.ruleRegistry().process(UnitBribed, this.unit(), this._target, this);
  }
}

export default BribeUnit;
