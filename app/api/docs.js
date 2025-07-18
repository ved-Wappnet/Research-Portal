import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const swaggerDocument = YAML.load(path.join(process.cwd(), 'swagger.yaml'));

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  return swaggerUi.setup(swaggerDocument)(req, res);
}

export const middleware = [swaggerUi.serve];
