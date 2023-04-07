import { Manager } from 'src/utils/manager.utils.js';
import { flatten, Flatten } from '../utils/flatten.utils.js';

interface Options<C> {
  load: () => C;
}

export class ConfigManager<C extends Record<string, unknown>> extends Manager<Flatten<C>> {
  constructor({ load }: Options<C>) {
    super({ load: () => flatten(load()) });
  }
}
