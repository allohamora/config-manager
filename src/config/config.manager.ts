import { Manager } from 'src/utils/manager.utils.js';
import { flatten, Flatten } from '../utils/flatten.utils.js';

interface Options<Config> {
  getConfig: () => Config;
}

export class ConfigManager<Config extends Record<string, unknown>> extends Manager<Flatten<Config>> {
  constructor({ getConfig }: Options<Config>) {
    super({ getSource: () => flatten(getConfig()) });
  }
}
