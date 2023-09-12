import { Manager } from 'src/utils/manager.utils.js';
import { flatten, Flatten } from '../utils/flatten.utils.js';

export type ConfigManagerOptions<Config> = {
  getConfig: () => Config;
};

export class ConfigManager<Config extends Record<string, unknown>> extends Manager<Flatten<Config>> {
  constructor({ getConfig }: ConfigManagerOptions<Config>) {
    super({ getSource: () => flatten(getConfig()) });
  }
}
