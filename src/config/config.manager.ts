import { Manager } from 'src/utils/manager.utils.js';
import { flatten, Flatten } from '../utils/flatten.utils.js';

interface Options<C> {
  getConfig: () => C;
}

export class ConfigManager<C extends Record<string, unknown>> extends Manager<Flatten<C>> {
  constructor({ getConfig }: Options<C>) {
    super({ getSource: () => flatten(getConfig()) });
  }
}
