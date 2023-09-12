import { defineBuildConfig } from 'unbuild';
import { join } from 'node:path';

export default defineBuildConfig({
  alias: {
    src: join(__dirname, 'src'),
  },
  failOnWarn: false,
  sourcemap: true,
});
