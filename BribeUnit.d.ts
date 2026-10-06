import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Action from '@civ-clone/core-unit/Action';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';
/**
 * A Diplomat pays `cost()` for `target()` to desert to its civilization. Whether it can is up to the `UnitBribed`
 * rules. The Diplomat isn't used up, and keeps its moves.
 */
export declare class BribeUnit extends Action {
  private _cost;
  private _target;
  constructor(
    from: Tile,
    to: Tile,
    unit: Unit,
    target: Unit,
    cost: number,
    ruleRegistry?: RuleRegistry
  );
  cost(): number;
  target(): Unit;
  forUnit(unit: Unit): Action;
  perform(): void;
}
export default BribeUnit;
