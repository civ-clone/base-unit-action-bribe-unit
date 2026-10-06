import type BribeUnit from '../BribeUnit';
import Rule from '@civ-clone/core-rule/Rule';
import Unit from '@civ-clone/core-unit/Unit';

/**
 * Processed when a Diplomat (the first `Unit`) bribes the second, by the `BribeUnit` action. `true` when the unit
 * changed sides.
 */
export class UnitBribed extends Rule<[Unit, Unit, BribeUnit], boolean> {}

export default UnitBribed;
